#!/usr/bin/env node

var console = require('console');
var when = require('when');
var nodefn = require('when/node');
var package = require('./package.json');

var fs = nodefn.liftAll(require('fs'));

function readtree(root, filter) {
    return when.reduce(
        fs.readdir(root).then(function (files) {
            return when.map(files, function (file) {
                return fs.stat(root + '/' + file).then(function (stats) {
                    if (stats.isFile()) {
                        if (filter === undefined || filter(root + '/' + file)) {
                            return [root + '/'+ file];
                        } else {
                            return [];
                        }
                    } else {
                        return readtree(root + '/'+ file, filter);
                    }
                });
            });
        }),
        function (files, allFiles) {
            return allFiles.concat(files);
        });
}

when.all(when.map(when.map(readtree('.', function (file) {
    if (file.substring(0, 10) === './typings/') {
        return false;
    }
    if (file.substring(0, 15) === './node_modules/') {
        return false;
    }
    if (file.substring(file.length - 5) === '.d.ts') {
        return true;
    }
    return false;
}), function (file) {
    var moduleName = file.substring(2, file.length - 5);
    if ((moduleName + '.js') === package.main) {
        moduleName = package.name;
    } else {
        moduleName = package.name + '/' + moduleName;
    }
    console.log('Transforming module ' + moduleName + ' (' + file + ')');
    return fs.readFile(file, { encoding: 'utf8' }).then(function (data) {
        return {
            fileName: file,
            fileData: data,
            moduleName: moduleName,
        };
    });
}), function (file) {
    return fs.writeFile(file.fileName, 'declare module "' + file.moduleName + '" {\n' + file.fileData.replace(/declare /, '').replace(/^.*reference.*$/, '') + '}\n', {
        encoding: 'utf8'
    }).then(function () {
        console.log('Transformed module ' + file.moduleName + ' (' + file.fileName + ')');
    });
})).done(function () {
    console.log('done');
});

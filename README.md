Intro
======

Basic Commands
--------------

    git clone git://github.com/Nemo157/test-d-ts-references
    cd test-d-ts-references/library
    npm run setup
    npm run build

Note the error messages from typescript

    cd ../application
    npm run setup
    npm run build

Note the error messages from typescript

    node index.js
    open index.js

View the developer console

    cd ../..
    git clone https://git01.codeplex.com/forks/nemo157/dtsmoduleresolution
    cd dtsmoduleresolution
    npm install -g jake
    jake local
    cp built/local/{tsc.js,lib.d.ts,typescript.js} ../test-d-ts-references/application/node_modules/typescript/bin
    cp built/local/{tsc.js,lib.d.ts,typescript.js} ../test-d-ts-references/library/node_modules/typescript/bin
    cd ../test-d-ts-references/library
    npm run setup
    npm run build

No error messages from typescript, it found the .d.ts files in the typings
directory for the external node modules.

    cd ../application
    npm run setup
    npm run build

No error messages from typescript, it found the .d.ts files in the typings
directory for the external node modules, along with .d.ts files in the
node_modules directory for 'library'.


    node index.js
    open index.js

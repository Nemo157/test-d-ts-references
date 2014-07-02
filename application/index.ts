import library = require('library')
import transforms = require('library/transforms')
import colors = require('colors')

colors.setTheme({
	highlight: 'red',
})

library.getValue().then(console.log.bind(console))
library.getValue(transforms.allCaps).then(console.log.bind(console))
library.getValue(value => value.highlight).then(console.log.bind(console))

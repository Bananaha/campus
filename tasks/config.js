var path = require('path'),
    pkg = require('../package.json'),
    appBase = 'app';

module.exports = {
    pkg: pkg,
    
    prod: false,
    
    scriptName: 'app.js',

    paths: {
        appBase: appBase,
        dist: 'dist',
        styles: path.join(appBase, 'less/main.less')
    }
};
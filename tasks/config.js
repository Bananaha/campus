var path = require('path'),
    pkg = require('../package.json'),
    appBase = 'app';

module.exports = {
    pkg: pkg,
    
    prod: false,
    
    scriptName: 'app.js',

    moduleName: 'campus.app',
    env: 'dev',
    appConfPath: 'config/appConfig.json',

    paths: {
        appBase: appBase,
        dist: 'dist',
        styles: path.join(appBase, 'less/main.less'),
    }
};
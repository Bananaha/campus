var path = require('path'),
    pkg = require('../package.json');

module.exports = {
    pkg: pkg,
    prod: false,
    scriptName: 'app.js',
    moduleName: 'campus.app',
    env: 'dev',
    appConfPath: 'app/config/appConfig.json',
    src: 'app',
    dist: 'dist'
};
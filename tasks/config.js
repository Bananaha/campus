var path = require('path'),
    pkg = require('../package.json');

module.exports = {
    pkg: pkg,
    prod: false,
    scriptName: 'app.js',
    moduleName: 'campus.app',
    env: 'dev',
    src: 'app',
    dist: 'dist',
    appConfPath: 'app/config/appConfig.json',
    stubbyConf: require('../app/config/stubby.json'),
};

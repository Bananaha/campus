var path = require('path'),
    pkg = require('../package.json');

module.exports = {
    pkg: pkg,
    prod: false,
    scriptName: 'app.js',
    vendorName: 'vendors.js',
    templatesName: 'tps.js',
    moduleName: 'campus.app',
    env: 'dev',
    src: 'app',
    dist: 'dist',
    appConfPath: 'app/config/appConfig.json',
    stubbyConfPath: 'app/config/stubby/',
    stubbyConf: require('../app/config/stubby.json')
};

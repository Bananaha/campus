var args = yargs = require('yargs'),
    path = require('path'),
    pkg = require('../package.json');

var args = yargs.argv;

module.exports = {
    pkg: pkg,
    enableWatch: !!args.watch,
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

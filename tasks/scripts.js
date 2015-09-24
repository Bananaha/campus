var path = require('path'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    sourcemaps = require('gulp-sourcemaps'),
    gIf = require('gulp-if'),
    eslint = require('gulp-eslint'),
    uglify = require('gulp-uglify'),
    fs = require('fs'),
    lazypipe = require('lazypipe'),
    ngAnnotate = require('gulp-ng-annotate'),
    ngConfig = require('gulp-ng-config'),
    ngTemplateCache = require('gulp-angular-templatecache');
    jade = require('gulp-jade'),
    config = require('./config.js');

var compileAngularTemplate = lazypipe()
    .pipe(jade, {
        pretty: false
    })
    .pipe(ngTemplateCache, {
        module: config.moduleName
    }),
    generateAngularConstants = lazypipe()
    .pipe(ngConfig, config.moduleName, {
        createModule: false,
        environment: config.env
    });


function getScriptsFromJade(getVendor) {
    var jadeSrc = path.join(config.src, 'templates', 'includes', 'scripts.jade'),
        fileContent = fs.readFileSync(jadeSrc, 'UTF-8'),
        SCRIPTS_REGEX = /script\(.*?src="(.*)".*?\)/mg,
        match,
        files = [],
        shouldAddIt;


    while (match = SCRIPTS_REGEX.exec(fileContent)) {
        shouldAddIt = isAppScript(match[1]);
        if (getVendor) {
            shouldAddIt = !shouldAddIt;
        }

        if (shouldAddIt) {
            files.push(match[1]);
        }
    }

    return files.map(function (scriptSrc) {
        return path.join(config.src, scriptSrc);
    });

    console.log(getVendor, files);

    return files;
}

function isAppScript(match) {
    return match.indexOf('bower_components') < 0;
}

gulp.task('lint', function () {
    return gulp.src(getScriptsFromJade())
        .pipe(eslint.format())
        .pipe(gIf(config.prod, eslint.failOnError()));
});

gulp.task('scripts-vendors', function() {
    return gulp.src(getScriptsFromJade(true))
        .pipe(plumber(config.plumber))
        .pipe(concat(config.vendorName))
        .pipe(gIf(config.prod, uglify()))
        .pipe(gulp.dest(path.join(config.dist, 'scripts')));
});

gulp.task('scripts-templates', function() {
    return gulp.src(path.join(config.src, 'templates', 'partials', '*.jade'))
        .pipe(plumber(config.plumber))
        .pipe(gIf(/.*\.jade$/, compileAngularTemplate()))
        .pipe(concat(config.templatesName))
        .pipe(gulp.dest(path.join(config.dist, 'scripts')));
});

gulp.task('scripts-app', function () {
    return gulp.src(
            getScriptsFromJade()
            .concat(config.appConfPath)
        )
        .pipe(plumber(config.plumber))
        // Config
        .pipe(gIf(/.*\.json/, generateAngularConstants()))
        .pipe(sourcemaps.init())
        .pipe(concat(config.scriptName))
        .pipe(gIf(config.prod, uglify()))
        .pipe(gIf(!config.prod, sourcemaps.write()))
        .pipe(gulp.dest(path.join(config.dist, 'scripts')));
});

gulp.task('scripts', ['scripts-vendors', 'scripts-templates', 'scripts-app', 'lint']);

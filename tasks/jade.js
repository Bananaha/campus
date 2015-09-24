var path = require('path'),
    gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    jade = require('gulp-jade'),
    htmlReplace = require('gulp-html-replace'),
    config = require('./config.js');

gulp.task('views', function () {
    return gulp.src([
            path.join(config.src, 'templates', '*.jade')
        ])
        .pipe(plumber(config.plumber))
        .pipe(jade({
            pretty: true
        }))
        .pipe(htmlReplace({
            js: 'scripts/' + config.scriptName,
            vendor: 'scripts/' + config.vendorName,
            tps: 'scripts/' + config.templatesName,
            keepBlockTags: true
        }))
        .pipe(gulp.dest(config.dist));
});

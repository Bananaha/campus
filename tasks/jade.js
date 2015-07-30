var path = require('path'),
    gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    jade = require('gulp-jade'),

    config = require('./config.js');

gulp.task('views', function () {
    return gulp.src([
            path.join(config.paths.appBase, 'templates', '*.jade')
        ])
        .pipe(plumber(config.plumber))
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest(config.paths.dist));
});
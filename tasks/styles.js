var path = require('path'),
    gulp = require('gulp'),
    less = require('gulp-less'),
    minify = require('gulp-csso'),
    cache = require('gulp-cache'),
    plumber = require('gulp-plumber');

    config = require('./config.js'),
    paths = config.paths;
    
gulp.task('styles', function () {
    return gulp.src(paths.styles)
        .pipe(plumber())
        .pipe(less())
        .pipe(cache(minify()))
        .pipe(gulp.dest(path.join(paths.dist, 'styles')));
});

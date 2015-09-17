var path = require('path'),
    gulp = require('gulp'),
    less = require('gulp-less'),
    minify = require('gulp-csso'),
    cache = require('gulp-cache'),
    plumber = require('gulp-plumber');
    config = require('./config.js');
    
gulp.task('styles', function () {
    return gulp.src(path.join(config.src, 'less', 'main.less'))
        .pipe(plumber())
        .pipe(less())
        .pipe(cache(minify()))
        .pipe(gulp.dest(path.join(config.dist, 'styles')));
});

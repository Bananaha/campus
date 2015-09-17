var path = require('path'),
    gulp = require('gulp'),
    config = require('./config.js');

gulp.task('assets', function () {
    return gulp.src(path.join(config.src, 'assets', '**'))
        .pipe(gulp.dest(path.join(config.dist, 'assets')));
});
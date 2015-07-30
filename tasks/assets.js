var path = require('path'),
    gulp = require('gulp'),

    config = require('./config.js'),
    paths = config.paths;

gulp.task('assets', function () {
    return gulp.src(path.join(paths.appBase, 'assets', '**'))
        .pipe(gulp.dest(path.join(paths.dist, 'assets')));
});
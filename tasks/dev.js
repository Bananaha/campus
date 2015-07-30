var path = require('path'),
    gulp = require('gulp'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync'),
    config = require('./config.js'),
    paths = config.paths,
    serve = require('gulp-serve');

gulp.task('server', function () {
    browserSync({
        files: path.join(paths.appBase, '**'),
        watchOptions: {
            interval: 1000
        },
        port: 8080,
        reloadDelay: 1000,
        server: {
            baseDir: paths.dist
        },
        online: false,
        notify: false
    });
});

gulp.task('server-old', serve({
  root: ['dist'],
  port: 8080
}));

gulp.task('watch', function () {
    var frequentChangesOpts = { interval: 500 },
        infrequentChangesOpts = { interval: 2000 };

    gulp.watch(path.join(paths.appBase, '**', '*.jade'), ['views']);
    gulp.watch(path.join(paths.appBase, 'less/**/*.less'), infrequentChangesOpts, ['styles']);
    gulp.watch(path.join(paths.appBase, 'scripts', '**', '*.js'), ['scripts']);
    gulp.watch(path.join(paths.appBase, 'assets', '**'), ['assets']);

});

gulp.task('serve', ['build'], function (cb) {
    runSequence(['watch', 'server'], cb);
});

gulp.task('build', ['views', 'styles', 'scripts', 'assets']);
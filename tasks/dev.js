var path = require('path'),
    gulp = require('gulp'),
    Stubby = require('stubby').Stubby,
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync'),
    config = require('./config.js'),
    serve = require('gulp-serve');

gulp.task('server', function () {
    browserSync({
        files: path.join(config.src, '**'),
        watchOptions: {
            interval: 1000
        },
        port: 8080,
        reloadDelay: 1000,
        reloadDebounce: 1000,
        ghostMode: false,
        server: {
            baseDir: config.dist
        },
        online: false,
        notify: false
    });
});

gulp.task('watch', function () {
    var frequentChangesOpts = { interval: 500 },
        infrequentChangesOpts = { interval: 2000 };

    gulp.watch([
        path.join(config.src, 'scripts', '**', '*.js'),
        config.appConfPath
    ], ['scripts']);
    gulp.watch(path.join(config.src, '**', '*.jade'), ['views', 'scripts']);
    gulp.watch(path.join(config.src, 'templates', 'partials', '*.jade'), ['scripts']);
    gulp.watch(path.join(config.src, 'less', '**', '*.less'), infrequentChangesOpts, ['styles']);
    gulp.watch(path.join(config.src, 'assets', '**'), ['assets']);
});

gulp.task('stubby', function () {
    new Stubby().start({
        location: '0.0.0.0',
        stubs: 8882,
        admin: 8889,
        data: config.stubbyConf,
        mute: false,
        watch: 'app/config/stubby.json'
    });
});

gulp.task('serve', ['build'], function (cb) {
    runSequence(['watch', 'server', 'stubby'], cb);
});

gulp.task('build', ['views', 'styles', 'scripts', 'assets']);

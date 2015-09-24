var path = require('path'),
    gulp = require('gulp'),
    Stubby = require('stubby').Stubby,
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync'),
    config = require('./config.js'),
    serve = require('gulp-serve');

gulp.task('server', function () {
    browserSync({
        files: path.join(config.dist, '**'),
        watchOptions: {
            interval: 250
        },
        port: 8080,
        reloadDebounce: 500,
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
        path.join(config.src, 'scripts', 'app', '**', '*.js'),
        config.appConfPath
    ], ['scripts-app', 'lint']);
    gulp.watch(path.join(config.src, 'scripts', 'bower_components', '**', '*.js'), ['scripts-vendors']);
    gulp.watch(path.join(config.src, '**', '*.jade'), ['views', 'scripts-templates']);
    gulp.watch(path.join(config.src, 'less', '**', '*.less'), infrequentChangesOpts, ['styles']);
    gulp.watch(path.join(config.src, 'assets', '**'), ['assets']);
});

gulp.task('stubby', function () {
    new Stubby().start({
        location: '0.0.0.0',
        stubs: 8882,
        admin: 8889,
        data: config.stubbyConf,
        mute: true,
        watch: 'app/config/stubby.json'
    });
});

gulp.task('serve', ['build'], function (cb) {
    runSequence(['watch', 'server', 'stubby'], cb);
});

gulp.task('build', ['views', 'styles', 'scripts', 'assets']);

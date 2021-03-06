var path = require('path'),
    gulp = require('gulp'),
    Stubby = require('stubby').Stubby,
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync'),
    config = require('./config.js'),
    serve = require('gulp-serve'),
    objectAssign = require('object-assign'),
    jsoncombine = require("gulp-jsoncombine");

gulp.task('server', function () {
    var settings = {
        port: 8080,
        ghostMode: false,
        server: {
            baseDir: config.dist
        },
        online: false,
        notify: false
    };

    if (config.enableWatch) {
        objectAssign(settings, {
            files: path.join(config.dist, '**'),
            watchOptions: {
                interval: 250
            },
            reloadDebounce: 500
        })
    }

    browserSync(settings);
});

gulp.task('watch', function () {
    if (!config.enableWatch) {
        return;
    }
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
    gulp.watch(path.join(config.stubbyConfPath, '*.json'), ['stubbyConf']);
});

function concatArrays(datas) {
    var mergedJson = Object.keys(datas).reduce(function(arr, key) {
        return arr.concat(datas[key]);
    }, []);
    return new Buffer(JSON.stringify(mergedJson, null, 3));
}

gulp.task('stubbyConf', function() {
    return gulp.src(path.join(config.stubbyConfPath, '*.json'))
        .pipe(jsoncombine('stubby.json', concatArrays))
        .pipe(gulp.dest('app/config'));
});

gulp.task('stubby', ['stubbyConf'], function (cb) {
    new Stubby().start({
        location: '0.0.0.0',
        stubs: 8882,
        admin: 8889,
        data: config.stubbyConf,
        watch: config.enableWatch ? 'app/config/stubby.json' : false,
        mute: true
    }, cb);
});

gulp.task('serve', ['build'], function (cb) {
    runSequence(['watch', 'server', 'stubby'], cb);
});

gulp.task('build', ['views', 'styles', 'scripts', 'assets']);

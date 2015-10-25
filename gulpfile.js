'use strict';

var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var less = require('gulp-less');
var babel = require('gulp-babel');
var babelify = require('babelify');
var del = require('del');
var minifyCSS = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var argv = require('yargs').argv;
var browserify = require('browserify');
var eventStream = require('event-stream');

var path = require('path');

var CONFIG = require('./tasks/config');

// Gather the mode from the arguments

var isDev = typeof argv.dev !== 'undefined';
var isProd = typeof argv.prod !== 'undefined';
var isStage = typeof argv.stage !== 'undefined';

var shouldMinify = isProd;
var shouldCleanAfterCompilation = false;

gulp.task('client:script', function() {
    var tasks = CONFIG.CLIENT_SCRIPTS.map(function(entry) {
        return browserify({
                entries: [ path.join(CONFIG.SOURCE_SCRIPT, entry) ],
                extensions: ['.js', '.jsx'],
                debug: true
            })
            .transform(babelify)
            .bundle()
                .on(
                    'error',
                    gulpUtil.log.bind(gulpUtil, 'Browserify error')
                )
            // Make sure it writes to a JS file
            .pipe(source(entry.replace('.jsx', '.js')))
            .pipe(buffer())
                .pipe(
                    sourcemaps.init({
                        loadMaps: true
                    })
                )
                    .pipe(shouldMinify ? uglify() : gulpUtil.noop())
                .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(CONFIG.DEST_SCRIPT));
    });

    return eventStream.merge.apply(null, tasks);
});

gulp.task('client:script:copy', function() {
    return gulp.src(path.join('node_modules', 'phaser', 'build', 'phaser.js'))
        .pipe(gulp.dest(CONFIG.DEST_SCRIPT));
});

// TODO: Separate out script from template build
// TODO: Add in builds for shared scripts
gulp.task('server:script', function() {
    return gulp.src(path.join(CONFIG.SOURCE_SERVER, '**', '*.{js,jsx}'))
        .pipe(babel())
        .pipe(gulp.dest(CONFIG.DEST_SERVER));
});

gulp.task('server:views:shared', function() {

    return gulp.src(path.join(CONFIG.SOURCE_SHARED_VIEW, '**', '*.jsx'))
        .pipe(babel())
        .pipe(gulp.dest(path.join(CONFIG.DEST_SERVER_VIEW, 'shared')));
})

gulp.task('client:style', function() {
    return gulp.src(CONFIG.SOURCE_STYLE_MAIN)
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
            .pipe(less({
                paths: CONFIG.SOURCE_STYLE
            }))
        .pipe(shouldMinify ? minifyCSS() : gulpUtil.noop())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(CONFIG.DEST_STYLE));
});

gulp.task('client', ['client:script', 'client:style', 'client:script:copy']);
gulp.task('server', ['server:script', 'server:views:shared']);

gulp.task('default', ['client', 'server']);
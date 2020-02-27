'use strict';

var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    minify = require('gulp-minify');

gulp.task('hello', function (done) {
    console.log('Hello Gulp!');
    done();
});

gulp.task('pug', gulp.series(function (done) {
    gulp.src('app/**/!(_)*.pug')
        .pipe(pug({
            pretty: true,
            basedir: __dirname + '/app'
        }))
        .pipe(gulp.dest('./dist/'));
    done();
}));

gulp.task('sass', gulp.series(function (done) {
    return gulp
        .src('app/assets/stylesheets/**/*.s*ss')
        .pipe(maps.init())
        .pipe(sass({}).on('error', sass.logError))
        .pipe(maps.write('./'))
        .pipe(gulp.dest('dist/assets/stylesheets'));
}));

gulp.task('buildsass', gulp.series(function (done) {
    return gulp
        .src('app/assets/stylesheets/**/*.s*ss')
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(gulp.dest('dist/assets/stylesheets'));
}));

gulp.task('clean-folders', gulp.series(function (done) {
    return gulp.src('dist/*/*', {
            read: false
        })
        .pipe(clean());
}));

gulp.task('clean-html', gulp.series(function (done) {
    return gulp.src('dist/*.html', {
            read: false
        })
        .pipe(clean());
}));

gulp.task('clean-js', gulp.series(function (done) {
    return gulp.src('dist/**/*.js*', {
            read: false
        })
        .pipe(clean());
}));

gulp.task('clean', gulp.series('clean-html', 'clean-js', 'clean-folders', function (done) {
    console.log('Successfully cleaned dist.');
    done();
}));

gulp.task('copyImages', gulp.series(function (done) {
    gulp.src(['app/assets/images/**/*']).pipe(gulp.dest('dist/assets/images'));
    done();
}));

gulp.task('copyVector', gulp.series(function (done) {
    gulp.src(['app/assets/vector/**/!(_)*.svg']).pipe(gulp.dest('dist/assets/vector'));
    done();
}));

gulp.task('copyJS', gulp.series(function (done) {
    gulp.src(['app/assets/javascript/**/!(_)*.js*']).pipe(gulp.dest('dist/assets/javascript'));
    done();
}));

gulp.task('copyFrameworks', gulp.series(function (done) {
    gulp.src(['app/assets/frameworks/**/!(_)*.js']).pipe(gulp.dest('dist/assets/frameworks'));
    done();
}));

gulp.task('copyLibraries', gulp.series(function (done) {
    gulp.src(['app/assets/libraries/**/!(_)*.js']).pipe(gulp.dest('dist/assets/libraries'));
    done();
}));

gulp.task('copyVideo', gulp.series(function (done) {
    gulp.src(['app/assets/video/*']).pipe(gulp.dest('dist/assets/video'));
    done();
}));

gulp.task('c', gulp.series(function (done) {
    connect.server({
        root: 'dist',
        livereload: false,
        fallback: 'dist/fallback.html'
    });
    done();
}));

gulp.task('compress', gulp.series(function (done) {
    gulp.src('app/assets/javascript/*.js')
        .pipe(minify({
            ext: {
                src: '.js',
                min: '.min.js'
            }
        }))
        .pipe(gulp.dest('dist/assets/javascript/'));
    done();
}));

gulp.task('watch', gulp.series(function (done) {
    gulp.watch('app/**/*.pug', gulp.series('pug'));
    gulp.watch('app/assets/stylesheets/**/*.s*ss', gulp.series('sass'));
    gulp.watch('app/assets/vector/**/*.svg', gulp.series('copyVector'));
    gulp.watch('app/assets/images/**/*', gulp.series('copyImages'));
    gulp.watch('app/assets/javascript/**/*', gulp.series('copyJS'));
    gulp.watch('app/assets/libraries/**/*', gulp.series('copyLibraries'));
    done();
}));

gulp.task('default', gulp.series('pug', 'copyFrameworks', 'copyLibraries', 'sass', 'copyVector', 'copyImages', 'copyJS', 'watch', 'c', function (done) {
    console.log('Development env. engaged!');
    done();
}));
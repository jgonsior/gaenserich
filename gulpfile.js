'use strict';

var gulp = require('gulp');
var pug = require('gulp-pug');
var less = require('gulp-less');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();
var cssnano = require('gulp-cssnano');
var uglify = require('gulp-uglify');

gulp.task('html', function() {
    gulp.src('src/pug/impressum.html').pipe(gulp.dest('dist/'))

    return gulp.src('src/pug/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('dist/'))
});

gulp.task('css', function() {
    return gulp.src(['node_modules/normalize.css/normalize.css', 'src/less/*.less'])
        .pipe(concat('style.css'))
        .pipe(less())
        .pipe(cssnano({
            preset: 'advanced'
        }))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('copy', () => {
    return gulp.src('src/dist/**/*')
        .pipe(gulp.dest('dist/'))
});

gulp.task('fa-fonts', function() {
    return gulp.src('node_modules/@fortawesome/fontawesome-free-webfonts/webfonts/*')
        .pipe(gulp.dest('dist/webfonts'))
});

gulp.task('fonts', function() {
    return gulp.src('node_modules/typeface-montserrat/files/*')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('js', function() {
    return gulp.src(['node_modules/scrollreveal/dist/scrollreveal.js', 'src/js/main.js'])
        //.pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        //  .pipe(sourcemaps.write())
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
});


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    });

    gulp.watch("src/**/*", ['html', 'css', 'fa-fonts', 'fonts', 'copy']);
    gulp.watch("src/**/*").on('change', browserSync.reload);
});

gulp.task('default', ['html', 'css', 'fa-fonts', 'fonts', 'copy']);

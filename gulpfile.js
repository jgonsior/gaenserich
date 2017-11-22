'use strict';
var gulp = require('gulp');
var pug = require('gulp-pug');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var htmlMinifier = require('gulp-html-minifier');
var del = require('del');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('views', () => {
  return gulp.src('src/pug/*.pug')
    .pipe(pug({}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('html', () => {
  return gulp.src('src/pug/*.pug')
    .pipe(pug({}))
    .pipe(htmlMinifier({
      removeComments: true,
      collapseWhitespace: true,
      removeTagWhitespace: true
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy', () => {
  return gulp.src('src/dist/**/*')
    .pipe(gulp.dest('dist/'));
});

gulp.task('scripts', function() {
  return gulp.src(['node_modules/scrollreveal/dist/scrollreveal.min.js', 'src/js/main.js'])
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));

})

gulp.task('copy-watch', ['copy'], function(done) {
  browserSync.reload();
  done();
})

gulp.task('fonts', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('dist/fonts'))
})

gulp.task('css', () => {
  return gulp.src(['node_modules/normalize.css/normalize.css', 'src/less/*.less'])
    .pipe(concat('style.css'))
    .pipe(less())
    .pipe(cssnano({preset: 'advanced'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('clean', (cb) => {
  return del.sync('dist',cb);
});

gulp.task('watch', () => {
  return gulp.watch('src/**/*', ['views', 'css', 'copy']);
});

gulp.task('build', ['views', 'fonts', 'scripts', 'css', 'copy']);

gulp.task('cleanandbuild', ['clean', 'build']);

gulp.task('default', ['cleanandbuild']);

// Static server
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    }
  });

  gulp.watch('src/**/*', ['views', 'css', 'copy-watch']);

});



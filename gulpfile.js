'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps');

gulp.task('sass', function() {
  return gulp.src('./scss/app.scss')
    .pipe(sass({ 
      outputStyle: 'compressed',
      includePaths: ['bower_components/materialize/sass']
    }).on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./css'));
});

gulp.task('copy', function() {
  gulp.src([
    './bower_components/jquery/dist/jquery.min.*',
    './bower_components/materialize/dist/js/materialize.min.*'
  ]).pipe(gulp.dest('./js'));

  return gulp.src([
    './bower_components/materialize/dist/font/roboto/**/*',
  ]).pipe(gulp.dest('./font/roboto'));
});

gulp.task('default', ['sass', 'copy']);

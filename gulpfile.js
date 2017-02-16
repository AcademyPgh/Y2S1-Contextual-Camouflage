'use strict';

var gulp = require('gulp'),
browserify = require('browserify'),
babelify = require('babelify'),
source = require('vinyl-source-stream'),
reactify = require('reactify'),
del = require('del'),
clean = require('gulp-clean');

gulp.task('build', function () {
    return browserify({entries: './static/jsx/app.jsx', extensions: ['.jsx'], debug: true})
        .transform('babelify', {presets: ['react', 'es2015']})
        .bundle()
        .on('error', function(err) { console.error(err); this.emit('end'); })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./static/dist'));
});
gulp.task('del', function () {
  return del(['./static/dist']);
});
gulp.task('clean', function () {
  return gulp.src(['./static/dist'], {read: false})
    .pipe(clean());
});

gulp.task('watch', ['build'], function () {
    gulp.watch('./static/jsx/*.jsx', ['build']);
});

gulp.task('default', ['clean'], function () {
    gulp.start(['watch']);

});

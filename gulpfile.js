// 'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    prefixer = require('gulp-autoprefixer'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync').create(),
    // spritesmith = require("gulp-spritesmith"),
    gulpif = require("gulp-if"),
    rimraf = require('rimraf'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    rigger = require('gulp-rigger'),
    reload = browserSync.reload;

                    // watch compile
gulp.task('sass:watch', function(){
    gulp.watch('./scss/*.scss',['sass']);
});

                    // Server reload
gulp.task('server', function() {
    browserSync.init({
        server: {
            port: 9000,
            baseDir: "build"
        },
        browser: "google chrome"
    });
});

                    
gulp.watch('build/**/*').on('change', browserSync.reload);


                    // HTML complile
gulp.task('templates:compile', function () {
    return gulp.src('source/*.html') 
        .pipe(rigger()) 
        .pipe(gulp.dest('build')); 
});

                // Styles:compile
gulp.task('styles:compile', function () {
  return gulp.src('source/styles/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(prefixer())
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('build/css'));
});

                // JS compile
gulp.task('js:compile', function () {
    return gulp.src('source/js/**.js')
        .pipe(rigger())
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
});

                // Delete
gulp.task('clean', function del(cb) {
    return (rimraf('build', cb));
});

            // Copy fonts
gulp.task('copy:fonts', function(){
    return gulp.src('source/fonts/**/*.*')
    .pipe(gulp.dest('build/fonts'));
});

            // Copy vendors
gulp.task('copy:vendors', function(){
    return gulp.src('vendor/**/*.*')
    .pipe(gulp.dest('build/vendor'));
});

            // Copy-fonts-awesome
gulp.task('copy:fonts-awesome', function() {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('build/fonts'));
});

            // Copy images
gulp.task('copy:images', function(){
    return gulp.src('source/images/**/*.*')
    .pipe(gulp.dest('build/images'));
});

                // Copy
gulp.task('copy', gulp.parallel('copy:images', 'copy:fonts','copy:fonts-awesome','copy:vendors'));

            // Watchers
gulp.task('watch', function(){
    gulp.watch('source/**/*.html', gulp.series('templates:compile'));
    gulp.watch('source/styles/**/*.scss', gulp.series('styles:compile'));
    gulp.watch('source/js/**/*.js', gulp.series('js:compile'));

});

gulp.task('default',gulp.series(
    'clean',
    gulp.parallel('templates:compile', 'styles:compile', 'js:compile', 'copy'),
    gulp.parallel('watch', 'server')
    )
);
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    pug = require('gulp-pug'),
    browserSync = require('browser-sync').create(),
    // spritesmith = require("gulp-spritesmith"),
    gulpif = require("gulp-if"),
    rimraf = require('rimraf'),
    rename = require('gulp-rename');

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
gulp.task('templates:compile', function buildHTML() {
  return gulp.src('source/templates/**/*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('build'));
});

                // Styles:compile
gulp.task('styles:compile', function () {
  return gulp.src('source/styles/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename('main.min.css'))
    .pipe(gulp.dest('build/css'));
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

            // Copy images
gulp.task('copy:images', function(){
    return gulp.src('source/images/**/*.*')
    .pipe(gulp.dest('build/images'));
});

                // Copy
gulp.task('copy', gulp.parallel('copy:images', 'copy:fonts'));

            // Watchers
gulp.task('watch', function(){
    gulp.watch('source/templates/**/*.pug', gulp.series('templates:compile'));
    gulp.watch('source/styles/**/*.scss', gulp.series('styles:compile'));
});

gulp.task('default',gulp.series(
    'clean',
    gulp.parallel('templates:compile', 'styles:compile', 'copy'),
    gulp.parallel('watch', 'server')
    )
);
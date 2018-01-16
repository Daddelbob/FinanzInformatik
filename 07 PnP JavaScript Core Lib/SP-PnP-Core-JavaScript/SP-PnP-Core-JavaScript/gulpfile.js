﻿var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
    demos: "./Layouts/SP-PnP-Core-JavaScript/",
    scss: "./Layouts/SP-PnP-Core-JavaScript/sass/**/*.scss",
    scssDest: "./Layouts/SP-PnP-Core-JavaScript/css/"
}

gulp.task('compile:sass', function () {
    gulp.src(paths.scss)
        .pipe(sass())
        .pipe(gulp.dest(paths.scssDest));
});

gulp.task('watch:sass',function() {
    gulp.watch(paths.scss, ['compile:sass']);
});

gulp.task('babel2es5', () => {
    return gulp.src([paths.demos + "*.js"])
        .pipe(sourcemaps.init())
        .pipe(babel({presets: ['es2015']}))
        .pipe(concat('es5bundle.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.demos));
});

gulp.task('watch:js', function () {
    gulp.watch(paths.scss, ['babel2es5']);
});

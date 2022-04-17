const { src, dest, series, parallel, watch } = require('gulp');

const pug = require('gulp-pug');
const htmlBeautify = require('gulp-html-beautify');
const sass = require('gulp-sass')(require('sass'));
const del = require('del');

function buildPug() {
    return src('./src/pug/**/!(_)*.pug')
        .pipe(pug())
        .pipe(htmlBeautify())
        .pipe(dest('./dist'))
}

function buildSass() {
    return src('./src/scss/**/*.scss', { sourcemaps: true })
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./dist/css', { sourcemaps: '.' }));
}

function copyJs() {
    return src('./src/js/**/*.js')
        .pipe(dest('./dist/js'))
}

function copyAssets() {
    return src('./src/assets/**/*.*')
        .pipe(dest('./dist/assets'));
}

function copyFonts() {
    return src('./src/fonts/**/*.*')
        .pipe(dest('./dist/fonts'));
}

function clean() {
    return del(['./dist']);
}

exports.clean = clean;
exports.build = series(clean, parallel(buildPug, buildSass, copyAssets, copyFonts, copyJs));
exports.watch = function () {
    exports.build();
    watch('./src/scss/**/*.scss', buildSass);
    watch('./src/**/*.pug', buildPug);
    watch('./src/assets/**/*.*', copyAssets);
    watch('./src/fonts/**/*.*', copyFonts);
    watch('./src/js/**/*.js', copyJs);
}
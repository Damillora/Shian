const {series, watch, src, dest, parallel} = require('gulp');

const sass = require('gulp-sass');
const livereload = require('gulp-livereload');
const zip = require('gulp-zip');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleancss = require('gulp-clean-css');

function serve(done) {
    livereload.listen();
    done();
}

function css () {

  return src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleancss({compatibility: 'ie8'}))
    .pipe(dest('dist/'))
    .pipe(livereload())
}
const cssWatcher = () => watch('src/sass/**', css);
const watcher = cssWatcher;
const build = css;
const dev = series(build, serve, watcher);

exports.build = build;
exports.dev = dev;
exports.default = build;


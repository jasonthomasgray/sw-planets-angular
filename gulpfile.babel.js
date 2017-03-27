import gulp from 'gulp';
import pump from 'pump';
const plugins = require('gulp-load-plugins')();

const paths = {
  scripts: [
    'bower_components/angular/angular.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'src/app.js',
    'src/components/**/*.js',
    'src/modules/**/*.js',
  ],
  tests: [
    'src/components/**/*.spec.js',
    'src/modules/**/*.spec.js',
  ],
  static: [
    'src/index.html',
    'src/components/**/*.html',
    'src/modules/**/*.html',
  ],
  sass: [
    'src/app.scss',
    'src/components/**/*.scss',
    'src/modules/**/*.scss',
  ]
}

gulp.task('scripts', (done) => {
  pump([
    gulp.src(paths.scripts.concat(ignore(paths.tests))),
    plugins.babel(), // TODO: stop running bower_components through here (gulp-if...)
    plugins.concat('app.js'),
    gulp.dest('dist'),
  ], done)
})

gulp.task('static', (done) => {
  pump([
    gulp.src(paths.static, {base: 'src'}),
    gulp.dest('dist'),
    gulp.src('bower_components/bootstrap-sass/assets/fonts/**/*', {base: 'bower_components/bootstrap-sass/assets'}),
    gulp.dest('dist'),
  ], done);
})

gulp.task('sass', (done) => {
  pump([
    gulp.src('src/app.scss'),
    plugins.sass({includePaths: ['.', 'bower_components/']}),
    gulp.dest('dist'),
  ], done);
});

gulp.task('watch', () => {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.static, ['static']);
  gulp.watch(paths.sass, ['sass']);
});

gulp.task('default', ['scripts', 'sass', 'static']);

function ignore(globs) {
  return globs.map((s) => '!' + s)
}

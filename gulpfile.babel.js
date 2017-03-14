import gulp from 'gulp';
import pump from 'pump';
const plugins = require('gulp-load-plugins')();

gulp.task('scripts', (done) => {
  pump([
    gulp.src([
      'bower_components/angular/angular.js',
      'src/app.js',
    ]),
    plugins.babel(),
    plugins.concat('app.js'),
    gulp.dest('dist'),
  ], done)
})

gulp.task('static', (done) => {
  pump([
    gulp.src('src/index.html'),
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
  gulp.watch('src/app.js', ['scripts']);
  gulp.watch('src/index.html', ['static']);
  gulp.watch('src/app.scss', ['sass']);
});

gulp.task('default', ['scripts', 'sass', 'static']);

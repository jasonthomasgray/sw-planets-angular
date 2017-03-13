import gulp from 'gulp';
import sass from 'gulp-sass';

gulp.task('scripts', () => {

})

gulp.task('static', () => {
  return gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
})

gulp.task('sass', () => {
  return gulp.src('src/app.scss')
    .pipe(sass({includePaths: ['.', 'bower_components/']}))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['scripts', 'sass', 'static']);

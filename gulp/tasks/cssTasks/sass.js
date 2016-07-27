var config = require('../../gulpconfig.json');
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src(config.sass.source)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(config.sass.destination));
});

gulp.task('watch', function () {
  gulp.watch(config.sass.source, ['sass']);
});

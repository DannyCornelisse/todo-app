var config = require('../../gulpconfig.json');
var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');

gulp.task('minify-css', function() {
  return gulp.src(config.minifyCss.source)
    .pipe(cleanCSS())
    .pipe(gulp.dest(config.minifyCss.destination));
});

var config = require('../../gulpconfig.json');
var gulp = require('gulp');
var clean = require('gulp-clean');
 
gulp.task('clean-style', function () {
    return gulp.src(config.minifyCss.source, {read: false})
    .pipe(clean());
});
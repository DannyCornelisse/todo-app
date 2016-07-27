var config = require('../../gulpconfig.json');
var gulp = require('gulp');

gulp.task('watch',function() {
    gulp.watch(config.sass.source,['all-css']);
});
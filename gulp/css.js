

var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('css', function(){
   gulp.src('css/**/*.css')
           .pipe(stylus())
           .pipe(gulp.dest('public/View/css'));
   console.log('gulp-stylus create css');
});


/*
 * ThuluSoftware.com web site.
 * Author: Thulu Software
 *           
 */
var gulp = require('gulp');

var fs = require('fs');
fs.readdirSync(__dirname + '/gulp').forEach(function(task){
   require('./gulp/' + task); 
});

gulp.task('dev', ['watch:css', 'watch:js', 'dev:server']); //główne zadanie 

gulp.task('watch:css', ['css'], function(){  // minutoring css
   gulp.watch('css/**/*.css', ['css']); 
});

gulp.task('watch:js', ['js'], function () { // monitoring js(angul)
    gulp.watch('angjs/**/*.js', ['js']);
});
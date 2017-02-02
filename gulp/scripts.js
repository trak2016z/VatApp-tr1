
var gulp = require('gulp');
var concat = require('gulp-concat');
var sourcem = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var ngAnnot = require('gulp-ng-annotate');

gulp.task('js', function () {
    gulp.src(['angularjs/module.js', 'angularjs/**/*.js'])
//            .pipe(sourcem.init())   // mapa źródeł (inicjalizacja)
                .pipe(concat('app.js')) // łączenie
                .pipe(ngAnnot())        // poprawne definiowanie zależności angular
                .pipe(uglify())         // miminalizacja 
//            .pipe(sourcem.write())
            .pipe(gulp.dest('public/Controller/staticjs/'));
    console.log('Gulp create: app.js');
});



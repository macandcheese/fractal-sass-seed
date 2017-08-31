var gulp = require('gulp');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var sassGlob = require('gulp-sass-glob');

// a task to import base variables first, then from within our import file, fetch component styles and add them to a concatenated output file
gulp.task('styles', function() {
	gulp.src(['global/import.scss'])
	.pipe(sassGlob())
	.pipe(sass().on('error', sass.logError))
	.pipe(rename('site.css'))
	// this is where site.css will be output. You'll reference this file in your _preview.hbs, so make sure the location is located in the static asset folder defined in fractal.js
	.pipe(gulp.dest('./public/stylesheets'))
});

// watcher
gulp.task('watch', function(){
	// don't watch our import file for changes, watch the underlying partials for changes. If changes, run styles task to re-compile
	gulp.watch(['global/**.scss' , 'components/**/*.scss'] , ['styles']); 
})

// make sure you run fractal with "fractal start --sync" to use livereload in conjunction with this
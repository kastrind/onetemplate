var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();

/* Task to compile less */ 
gulp.task('compile-less', function () {
  return gulp.src('src/less/**/*.less')
    .pipe(less())
	.on('error', function(errorInfo){
		console.log(errorInfo.toString());
		this.emit('end');
	})
    .pipe(gulp.dest('dist/style'))
	.pipe(browserSync.stream());
});

/* Configure which files to watch and what tasks to use on file changes */
gulp.task('watch', function() {
  browserSync.init( { server: { baseDir: "./" } } );
  gulp.watch('src/less/**/*.less' , ['compile-less']);
  gulp.watch(['index.html'], function() {
	  browserSync.reload();
  });
});

/* Define the default task and add the watch task to it */
gulp.task('default', ['watch']);
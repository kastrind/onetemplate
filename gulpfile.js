var gulp = require('gulp');
var del = require("del");
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var browserSync = require('browser-sync').create();

var paths = {
  libsDestination: "./src/script/libs",
  libs: [
        "./node_modules/jquery/dist/jquery.js",
    ]
}

/* Task to clean project from imported libraries */
gulp.task("clean-lib", function() {
  return del([paths.libsDestination]);
});

/* Task to import libraries in project */
gulp.task('create-lib', ['clean-lib'], function () {
  return gulp.src(paths.libs)
    .pipe(gulp.dest(paths.libsDestination));
});

/* Task to compile less */
gulp.task('compile-less', function () {
  return gulp.src('src/less/**/*.less')
    .pipe(less())
	.on('error', function(errorInfo){
		console.log(errorInfo.toString());
		this.emit('end');
	})
    .pipe(gulp.dest('src/style'))
	.pipe(browserSync.stream());
});

/* Task to bundle css */
gulp.task('bundle-css', function () {
  return gulp.src('dist/style/**/*.css')
    .pipe(concat('styles.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/style/min'));
});

/* Task to bundle js */
gulp.task('bundle-js', ['create-lib'], function() {
  return gulp.src(['src/script/libs/**/*.js', 'src/script/*.js'])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
  .pipe(gulp.dest('dist/script/min'));
});

/* Task to replace style and script inclusions in HTML with minified, bundled style and script inclusions */
gulp.task('useref', function () {
return gulp.src('index.html')
    .pipe(useref({ noAssets: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean-lib', 'create-lib', 'bundle-css', 'bundle-js', 'useref']);

/* Configure which files to watch and what tasks to use on file changes */
gulp.task('watch', function() {
  browserSync.init( { server: { baseDir: "./" } } );
  gulp.watch('src/less/**/*.less' , ['compile-less']);
  gulp.watch('src/script/**/*.js', function() {
    browserSync.reload();
  });
  gulp.watch(['index.html'], function() {
	  browserSync.reload();
  });
});

/* Define the default task and add the watch task to it */
gulp.task('default', ['watch']);

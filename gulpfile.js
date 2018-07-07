var gulp = require('gulp');
var del = require("del");
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var webpack = require('webpack');
var browserSync = require('browser-sync').create();

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

/* Task to minify & bundle css */
gulp.task('minify-bundle-css', ['compile-less'], function () {
  return gulp.src('dist/style/**/*.css')
    .pipe(concat('styles.min.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/style/min'));
});

/* Task to minify and bundle js */
gulp.task('minify-bundle-js', ['transpile-bundle-scripts'], function() {
  return gulp.src(['dist/script/*.js'])
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

/* transpile and bundle scripts with webpack */
gulp.task('transpile-bundle-scripts', function (callback) {
	webpack(require('./webpack.config.js'), function(err, stats) {
		if (err) {
			console.log(err.toString());
		}
		console.log(stats.toString());
		callback();
	});
});

gulp.task('build', ['compile-less', 'minify-bundle-css', 'transpile-bundle-scripts', 'minify-bundle-js', 'useref']);

gulp.task('refresh', ['build'], function() {
	browserSync.reload();
});

/* Configure which files to watch and what tasks to use on file changes */
gulp.task('watch', function() {
  browserSync.init( { server: { baseDir: "./" } } );
  gulp.watch(['src/less/**/*.less', 'src/script/**/*.js'], function() {
    gulp.start('refresh');
  });
  gulp.watch(['index.html'], function() {
	  browserSync.reload();
  });
});

/* Define the default task and add the watch task to it */
gulp.task('default', ['watch']);

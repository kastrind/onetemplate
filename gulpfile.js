var gulp = require('gulp');
var del = require('del');
var replace = require('gulp-replace');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var webpack = require('webpack');
var browserSync = require('browser-sync').create();

/* Task to clean the project from built files */
gulp.task('clean', function () {
  del('./dist/*');
});

/* Task to copy js add-ons like jquery plugins */
gulp.task('copy-addons', function () {
  gulp.src('node_modules/gmaps/gmaps.js')
    .pipe(gulp.dest('dist/addons/gmaps'));

  return gulp.src('node_modules/lightslider/dist/**')
    .pipe(gulp.dest('dist/addons/lightslider'));
});

/* Task to compile less */
gulp.task('compile-less', function () {
  return gulp.src('src/less/**/*.less')
    .pipe(less())
	  .on('error', function(errorInfo){
		     console.log(errorInfo.toString());
		       this.emit('end');
    })
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/style'))
    .pipe(browserSync.stream());
});

/* Task to minify & bundle css */
gulp.task('minify-bundle-css', ['compile-less', 'copy-addons'], function () {
  return gulp.src(['dist/style/*.css', 'dist/addons/lightslider/css/lightslider.css'])
    .pipe(concat('styles.min.css'))
    .pipe(cleanCSS({rebaseTo : 'dist/style/min'}))
    .pipe(gulp.dest('dist/style/min'))
    .pipe(browserSync.stream());
});

/* Task to minify and bundle js */
gulp.task('minify-bundle-js', ['transpile-bundle-scripts'], function() {
  return gulp.src(['dist/script/*.js', 'dist/addons/lightslider/js/lightslider.js'])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
  .pipe(gulp.dest('dist/script/min'));
});

/* Task to replace style and script inclusions in HTML with minified, bundled style and script inclusions */
gulp.task('useref', ['minify-bundle-css', 'minify-bundle-js'], function () {
return gulp.src('index.html')
    .pipe(replace('src/assets', 'assets'))
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

/* Task to copy assets to dist */
gulp.task('copy-assets', function () {
  return gulp.src('assets/**/*')
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('build-prod', ['compile-less', 'copy-assets', 'copy-addons', 'minify-bundle-css', 'transpile-bundle-scripts', 'minify-bundle-js', 'useref']);

gulp.task('build-dev', ['compile-less', 'copy-addons', 'transpile-bundle-scripts']);

gulp.task('refresh-prod', ['build-prod'], function() {
	browserSync.reload();
});
gulp.task('refresh-dev', ['build-dev'], function() {
	browserSync.reload();
});

/* Configure which files to watch and what tasks to use on file changes */
gulp.task('watch-prod', ['build-prod'], function() {

  browserSync.init( { server: { baseDir: "./dist" } } );

  gulp.watch('index.html', function() {
    browserSync.reload();
  });

  gulp.watch('src/script/**/*.js', function() {
    gulp.start('refresh-prod');
  });

  gulp.watch('src/less/**/*.less', function() {
    gulp.start('minify-bundle-css');
  });

});

/* Configure which files to watch and what tasks to use on file changes */
gulp.task('watch-dev', function() {

  browserSync.init( { server: { baseDir: "./" } } );

  gulp.watch('index.html', function() {
    browserSync.reload();
  });

  gulp.watch('src/script/**/*.js', function() {
    gulp.start('refresh-dev');
  });

  gulp.watch('src/less/**/*.less', function() {
    gulp.start('compile-less');
  });

});

/* Define the default task and add the watch task to it */
gulp.task('default', ['watch-dev']);

var gulp = require('gulp');
var del = require('del');
var replace = require('gulp-replace');
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
//var uglify = require('gulp-uglify');
//to support ES6.
var uglify = require('gulp-uglify-es').default;
var useref = require('gulp-useref');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');
var browserSync = require('browser-sync').create();
var base64 = require('gulp-base64');
var svgSprite = require("gulp-svg-sprites");

var sourceStyles = [
                    'dist/style/*.css',
                    'dist/assets/img/svg/css/sprite.css',
                    'node_modules/lightbox2/dist/css/lightbox.css',
                    'node_modules/lightslider/dist/css/lightslider.css',
                    'node_modules/lightgallery/dist/css/lightgallery.css',
                    'node_modules/owl.carousel/dist/assets/owl.carousel.css',
                    'node_modules/owl.carousel/dist/assets/owl.theme.default.css',
                    'node_modules/@fortawesome/fontawesome-free/css/all.css'
                   ];

/* Task to clean the project from built files */
gulp.task('clean', function () {
  del('./dist/*');
  del('./docs/*');
});

/* Task to copy styles from plugins */
gulp.task('copy-vendor-styles', function () {
  return gulp.src(sourceStyles.slice(2))
  .pipe(gulp.dest('dist/style'));
});

/* Task to compile less */
gulp.task('compile-less', ['copy-assets'], function () {
  return gulp.src('src/less/style.less')
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
gulp.task('minify-bundle-css', ['compile-less', 'copy-vendor-styles', 'create-svg-sprites'], function () {
  return gulp.src(sourceStyles)
    .pipe(base64({exclude: [sourceStyles[0]]}))
    .pipe(cleanCSS({rebaseTo : 'dist/style/min'}))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('dist/style/min'))
    .pipe(browserSync.stream());
});

/* Task to replace style and script inclusions in HTML with minified, bundled style and script inclusions */
gulp.task('useref', ['minify-bundle-css'], function () {
return gulp.src('index.html')
    .pipe(replace('src/assets', 'assets'))
    .pipe(useref({ noAssets: true }))
    .pipe(gulp.dest('dist'));
});

gulp.task('webpack-prod', function () {
  webpackConfig.devtool = 'source-map';
  webpackConfig.mode = 'production';
});

/* transpile and bundle scripts with webpack */
gulp.task('transpile-bundle-scripts', ['copy-vendor-styles'], function (callback) {
	webpack(webpackConfig, function(err, stats) {
		if (err) {
			console.log(err.toString());
		}
		console.log(stats.toString());
		callback();
	});
  console.log(webpackConfig);
});

/* Task to copy assets to dist */
gulp.task('copy-assets', function () {
  return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('dist/assets'));
});

gulp.task('create-svg-sprites', ['copy-assets'], function () {
    return gulp.src('src/assets/img/**/*.svg')
        .pipe(svgSprite())
        .pipe(gulp.dest("dist/assets/img/svg"));
});

gulp.task('build-prod', ['copy-assets', 'compile-less', 'create-svg-sprites', 'copy-vendor-styles', 'minify-bundle-css', 'webpack-prod', 'transpile-bundle-scripts', 'useref']);

gulp.task('build-dev', ['compile-less', 'copy-assets', 'copy-vendor-styles', 'transpile-bundle-scripts']);

gulp.task('refresh-prod', ['build-prod'], function() {
	browserSync.reload();
});
gulp.task('refresh-dev', ['build-dev'], function() {
	browserSync.reload();
});

/* Configure which files to watch and what tasks to use on file changes */
gulp.task('watch-prod', ['build-prod'], function() {

  browserSync.init( { server: { baseDir: "./dist" } } );

  gulp.watch(['index.html', 'src/script/**/*.js'], function() {
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

  gulp.start('copy-assets');
  gulp.watch('src/less/paths.less', function() {
    gulp.start('copy-assets');
  });

  gulp.start('create-svg-sprites');
  gulp.watch('src/assets/img/**/*.svg', function() {
    gulp.start('create-svg-sprites');
  });

});

/* Task to create folder to be published on github */
gulp.task('create-github-page', ['build-prod'], function () {
  return gulp.src('dist/**/*')
    .pipe(gulp.dest('docs'));
});

/* Define the default task and add the watch task to it */
gulp.task('default', ['watch-dev']);

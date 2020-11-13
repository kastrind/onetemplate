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
var webpackConfig = require('./webpack.config.chunks.js');
var browserSync = require('browser-sync').create();
var base64 = require('gulp-base64');
var svgSprite = require("gulp-svg-sprites");

var sourceStyles = [
  'dist/style/*.css',
  'dist/assets/img/svg/css/sprite.css',
  'dist/addons/lightbox2/css/lightbox.css',
  'dist/addons/lightslider/css/lightslider.css',
  'dist/addons/lightgallery/css/lightgallery.css',
  'dist/addons/owl.carousel/assets/owl.carousel.css',
  'dist/addons/owl.carousel/assets/owl.theme.default.css',
  'dist/addons/fontawesome-free/css/all.css'
];

/* We have to include some add-ons in order to include their css assets easily */ 
var addons = [
  { src: 'node_modules/lightbox2/dist/**', dest: 'dist/addons/lightbox2' },
  { src: 'node_modules/lightslider/dist/**', dest: 'dist/addons/lightslider' },
  { src: 'node_modules/lightgallery/dist/**', dest: 'dist/addons/lightgallery' },
  { src: 'node_modules/owl.carousel/dist/**', dest: 'dist/addons/owl.carousel' },
  { src: 'node_modules/@fortawesome/fontawesome-free/**', dest: 'dist/addons/fontawesome-free' }
];

/* Task to clean the project from built files */
gulp.task('clean', function () {
  del('./dist/*');
  return del('./docs/*');
});

/* Task to copy add-ons and plugins */
gulp.task('copy-addons', function () {
  for (var key in addons) {
    if (key == addons.length-1) break;
    gulp.src(addons[key].src)
    .pipe(gulp.dest(addons[key].dest));
  }
  return gulp.src(addons[addons.length-1].src)
  .pipe(gulp.dest(addons[addons.length-1].dest));
});

/* Task to copy assets to dist */
gulp.task('copy-assets', function () {
  return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('dist/assets'));
});

/* Task to compile less */
gulp.task('compile-less', gulp.series('copy-assets', function () {
  return gulp.src('src/less/style.less')
    .pipe(less())
	  .on('error', function(errorInfo){
		     console.log(errorInfo.toString());
		       this.emit('end');
    })
    .pipe(autoprefixer())
    .pipe(gulp.dest('dist/style'))
    .pipe(browserSync.stream());
}));

gulp.task('create-svg-sprites', gulp.series('copy-assets', function () {
  return gulp.src('src/assets/img/**/*.svg')
      .pipe(svgSprite())
      .pipe(gulp.dest("dist/assets/img/svg"));
}));

/* Task to minify & bundle css */
gulp.task('minify-bundle-css', gulp.series('compile-less', 'copy-addons', 'create-svg-sprites', function () {
  return gulp.src(sourceStyles)
    .pipe(base64({exclude: [sourceStyles[0]]}))
    .pipe(cleanCSS({rebaseTo : 'dist/style/min'}))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('dist/style/min'))
    .pipe(browserSync.stream());
}));

/* Task to replace style and script inclusions in HTML with minified, bundled style and script inclusions */
gulp.task('useref', gulp.series('minify-bundle-css', function () {
return gulp.src('index.html')
    .pipe(replace('src/assets', 'assets'))
    .pipe(useref({ noAssets: true }))
    .pipe(gulp.dest('dist'));
}));

gulp.task('webpack-prod', async function () {
  webpackConfig.devtool = 'source-map';
  webpackConfig.mode = 'production';
});

/* transpile and bundle scripts with webpack */
gulp.task('transpile-bundle-scripts', gulp.series('copy-addons', function (callback) {
	webpack(webpackConfig, function(err, stats) {
		if (err) {
			console.log(err.toString());
		}
		console.log(stats.toString());
		callback();
	});
  console.log(webpackConfig);
}));

gulp.task('build-prod', gulp.series('copy-assets', 'compile-less', 'create-svg-sprites', 'copy-addons', 'minify-bundle-css', 'webpack-prod', 'transpile-bundle-scripts', 'useref'));

gulp.task('build-dev', gulp.series('compile-less', 'copy-assets', 'copy-addons', 'transpile-bundle-scripts'));

gulp.task('refresh-prod', gulp.series('build-prod', function() {
	browserSync.reload();
}));
gulp.task('refresh-dev', gulp.series('build-dev', function() {
	browserSync.reload();
}));

/* Configure which files to watch and what tasks to use on file changes */
gulp.task('watch-prod', gulp.series('build-prod', function() {

  browserSync.init( { server: { baseDir: "./dist" } } );

  gulp.watch(['index.html', 'src/script/**/*.js'], function() {
    gulp.series('refresh-prod');
  });

  gulp.watch('src/less/**/*.less', function() {
    gulp.series('minify-bundle-css');
  });

}));

/* Configure which files to watch and what tasks to use on file changes */
gulp.task('watch-dev', function() {

  browserSync.init( { server: { baseDir: "./" } } );

  gulp.watch('index.html', function() {
    browserSync.reload();
  });

  gulp.watch('src/script/**/*.js', function() {
    gulp.series('refresh-dev');
  });

  gulp.watch('src/less/**/*.less', function() {
    gulp.series('compile-less');
  });

  gulp.series('copy-assets');
  gulp.watch('src/less/paths.less', function() {
    gulp.series('copy-assets');
  });

  gulp.series('create-svg-sprites');
  gulp.watch('src/assets/img/**/*.svg', function() {
    gulp.series('create-svg-sprites');
  });

});

/* Task to create folder to be published on github */
gulp.task('create-github-page', gulp.series('build-prod', function () {
  return gulp.src('dist/**/*')
    .pipe(gulp.dest('docs'));
}));

/* Define the default task and add the watch task to it */
gulp.task('default', gulp.series('watch-dev'));

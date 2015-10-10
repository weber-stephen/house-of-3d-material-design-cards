var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssjoin = require('gulp-cssjoin'),
    concat = require('gulp-concat-sourcemap'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant');
 
var paths = {
  src:'src',
  build:'build',
  bower_components:'bower_components',
  vendor:'vendor',
  tpl:'tpl',
};

/**
 * $ gulp default
 * description: launches server
 */
// Static Server + watching scss/html files
gulp.task('serve', ['html','imagemin','data','js','sass'], function() {

    browserSync.init({
        server: "./build"
    });

    gulp.watch([
      './'+paths.src+'/sass/main.scss',
      './'+paths.src+'/sass/**/*.scss'
    ], ['sass']);

    gulp.watch([
      './'+paths.src+'/img/*.jpg',
      './'+paths.src+'/img/*.png',
      './'+paths.src+'/img/*.gif',
      './'+paths.src+'/img/**/*.jpg',
      './'+paths.src+'/img/**/*.png',
      './'+paths.src+'/img/**/*.gif',
    ], ['imagemin']);

    gulp.watch(['./'+paths.src+'/js/*.js'], ['js']);

    gulp.watch([
      paths.src+'/index.html',
    ],['html']).on('change', browserSync.reload);
});

/**
 * $ gulp sass
 * description: 
 */
gulp.task('sass', function () {
  return gulp.src([
    './'+paths.src+'/sass/main.scss',
    './'+paths.src+'/sass/**/*.scss'
  ])
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./'+paths.build+'/css'))
  .pipe(browserSync.stream());
});

/**
 * $ gulp copy html and templates
 * description: 
 */
gulp.task('html', function() {

  return gulp.src('./'+paths.src+'/index.html')
  .pipe(gulp.dest('./'+paths.build));

});

/**
 * $ gulp copy html and templates
 * description: 
 */
gulp.task('data', function () {
  return gulp.src('./'+paths.src+'/data/*.json')
  .pipe(gulp.dest('./'+paths.build+'/data'));
});

/**
 * $ gulp compile js
 * description: 
 */
gulp.task('js', function () {
  return gulp.src([
    './'+paths.src+'/js/*.js'
  ])
  .pipe(concat('main.js',{sourcesContent:true}))
  .pipe(gulp.dest('./'+paths.build+'/js'));
});

/**
 * $ gulp compress images
 * description: Compresses images from original quality
 */
gulp.task('imagemin', function () {
    return gulp.src(['src/img/*','src/img/**/*'])
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('build/img'));
});

gulp.task('default', ['serve']);

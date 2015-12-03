var gulp         = require('gulp'),
    concatify    = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    flatten      = require('gulp-flatten');

// scripts
var jscs         = require('gulp-jscs');

// styles
var sass         = require('gulp-sass'),
    cssmin       = require('gulp-cssmin'),
    autoprefixer = require('gulp-autoprefixer');

// other
var bower        = require('gulp-bower');

// html optimisation
var htmlmin = require('gulp-htmlmin');

var path = {
    scripts:    ['client/js/**/*'],
    images:     'client/img/**/*',
    html:       'client/**/*.html',
    styles:     'client/scss/**/*.scss',
    dev:        'development',
    prod:       'production'
};




/*****************************************************************************
 * GENERIC
 *****************************************************************************/

gulp.task('clean', function() {
    return del([path.dev, path.prod]);
});

gulp.task('jscs', function() {
    return gulp.src(paths.js)
        .pipe(jscs());
});

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(path.dev + '/lib/'))
        .pipe(gulp.dest(path.prod + '/lib/'));
});

gulp.task('images', function() {
    return gulp.src(path.images)
        .pipe(flatten())
        .pipe(gulp.dest(path.dev + '/img/'))
        .pipe(gulp.dest(path.prod + '/img/'));
});




/*****************************************************************************
 * HTML
 *****************************************************************************/

gulp.task('html', function() {
    return gulp.src(path.html)
        .pipe(gulp.dest(path.dev))
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(path.prod));
});




/*****************************************************************************
 * SCRIPTS
 *****************************************************************************/

 gulp.task('scripts', function() {
   return gulp.src(path.scripts)
     .pipe(concatify('scripts.js'))
     .pipe(gulp.dest(path.dev + '/js/'))
     .pipe(uglify())
     .pipe(gulp.dest(path.prod + '/js/'));
 });




/*****************************************************************************
 * STYLES
 *****************************************************************************/
var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded',
};

var prefixerOptions = {
    browsers: ['last 4 versions'],
    cascade: false,
};

gulp.task('styles', function() {
    gulp.src(path.styles)
        .pipe(sass(sassOptions))
        .pipe(autoprefixer(prefixerOptions))
        .pipe(concatify('styles.css'))
        .pipe(gulp.dest(path.dev + '/css/'))
        .pipe(cssmin())
        .pipe(gulp.dest(path.prod + '/css/'));
});




/*****************************************************************************
 * GENERAL TASKS
 *****************************************************************************/
gulp.task('default', function() {
    gulp.watch(path.scripts, ['scripts']);
    gulp.watch(path.images, ['images']);
    gulp.watch(path.html, ['html']);
    gulp.watch(path.styles, ['styles']);
});

gulp.task('build', ['scripts', 'bower', 'images', 'html', 'styles']);

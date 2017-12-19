// Required //

var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	htmlmin = require('gulp-htmlmin'),
	sass = require('gulp-sass'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	imagemin = require('imagemin');
	del = require('del');

// http-server //

	gulp.task('browser-sync', function() {
    	browserSync.init({
	        server: {
	            baseDir: "./"
	        }
    	});
	});

	gulp.task('serve', ['sass', 'htmlmin', 'uglify'], function() {

	    browserSync.init({
	        server: "./build"
	    });


	    gulp.watch("src/**/*.html", ['htmlmin']);
	    gulp.watch("src/scss/*.scss", ['sass']);
	    gulp.watch("src/js/*.js", ['uglify']);
	    gulp.watch("build/**/*.html").on('change', browserSync.reload);
	});


	// HTML //

	gulp.task('htmlmin', function(){
		return gulp.src('./src/**/*.html')
		.pipe(htmlmin({collapseWhitespace: true}))
		.pipe(gulp.dest('./build'))
		.pipe(browserSync.stream());
	})


	// SASS //

	gulp.task('sass', function() {
	    return gulp.src('src/scss/styles.scss')
	        .pipe(sass())
	        .pipe(gulp.dest('build/css'))
	        .pipe(browserSync.stream());
	});

	// Minify JS //

	gulp.task('uglify', function(){
		return gulp.src('src/js/*.js')
			.pipe(uglify())
			.pipe(concat('all.js'))
			.pipe(gulp.dest('build/js'));
	});


	// Images //
	// gulp.task('imagemin', function() {
	// 	return gulp.src('src/img/*.webp')
	// 	.pipe(imagemin())
	// 	.pipe(gulp.dest('build/img'));
	// })

	// Default task //

	gulp.task('default', ['serve']);
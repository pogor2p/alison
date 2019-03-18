var gulp = require('gulp'),
	gutil = require('gulp-util'),
	resolvePath = require('path'),
	sass = require('gulp-sass'),
	babel = require('gulp-babel'),
	sourcemaps = require('gulp-sourcemaps'),
	uglify = require('gulp-uglify'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	webpackStream = require('webpack-stream'),
	webpack = webpackStream.webpack,
	reload = require('browser-sync').reload;

const isBuild = gutil.env.env === 'build';

const serverConfig = {
	server: {
		baseDir: "./dist"
	},
	tunnel: false,
	host: "localhost",
	port: 63341,
	logPrefix: "browser-sync"
};

const path = {
	build: {
		html: "build/",
		js: "build/js/",
		css: "build/css/",
		img: "build/img/",
		fonts: "build/fonts/"
	},
	dist: {
		html: "dist/",
		js: "dist/js/",
		css: "dist/css/",
		img: "dist/img/",
		fonts: "dist/fonts/"
	},
	src: {
		html: ["src/**/*.html"],
		js: "src/js/main.js",
		style: "src/sass/build.sass",
		img: "src/img/**/*.*",
		fonts: "src/fonts/**/*.*"
	},
	watch: {
		html: "src/**/*.html",
		js: "src/js/**/*.js",
		style: "src/sass/**/*.*",
		img: "src/img/**/*.*",
		fonts: "src/fonts/**/*.*"
	},
};
path.dest = isBuild ? path.build : path.dist;

const webpackOptions = {
  mode: isBuild ? 'production' : 'development',
  entry: resolvePath.join(__dirname, path.src.js),
  output: {
    path: resolvePath.join(__dirname, path.dest.js),
    filename: 'main.js'
  }
};

// SASS
gulp.task('sass', function () {
	var outputStyle = isBuild ? 'compressed' : 'expanded';
	if (isBuild) {
		sourcemaps = {};
		sourcemaps.init = gutil.noop;
		sourcemaps.write = gutil.noop;
	}
	gulp.src(path.src.style)
		.pipe(sourcemaps.init())
		.pipe(sass({
			soursemap: !isBuild,
			outputStyle: outputStyle
		}).on('error', sass.logError))
		.pipe(autoprefixer({browsers:['last 2 versions']}))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(path.dest.css))
		.pipe(reload({stream:true}));
});

// PUG
gulp.task('pug', function(){
	gulp.src(path.src.html)
		.pipe(gulp.dest(path.dest.html))
		.pipe(reload({stream:true}));
});

// SCRIPTS
gulp.task('scripts', function(){
	if (!isBuild) {
		uglify = gutil.noop;
	}
	gulp.src(path.src.js)
		.pipe(webpackStream(webpackOptions))
		.pipe(gulp.dest(path.dest.js))
		.pipe(reload({stream:true}));
});

// IMAGES
gulp.task('images', function(){
	gulp.src(path.src.img)
		.pipe(gulp.dest(path.dest.img));
});

// FONTS
gulp.task('fonts', function(){
	gulp.src(path.src.fonts)
		.pipe(gulp.dest(path.dest.fonts));
});

// SERVER
gulp.task('browser-sync', function() {
	if (isBuild) {
		return;
	}
	setTimeout(() => {
		browserSync.init(serverConfig);
	}, 100);
});

// WATCH
gulp.task('watch', function() {
	if (isBuild) {
		return;
	}
	gulp.watch(path.watch.html, ['pug']);
	gulp.watch(path.watch.style, ['sass']);
	gulp.watch(path.watch.js, ['scripts']);
	gulp.watch(path.watch.img, ['images']);
});

// DEFAULT
gulp.task('default', ['sass', 'pug', 'scripts', 'images', 'fonts', 'browser-sync', 'watch']);

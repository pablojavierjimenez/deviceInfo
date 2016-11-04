///////////////////////////
//       REQUIRES       //
//////////////////////////
  var gulp        = require('gulp'),
    fileSistem    = require('fs'),
    exec          = require('child_process').exec,
    browserSync   = require('browser-sync'),
    runSequence   = require('run-sequence'),
    gulpif        = require('gulp-if'),
    imagemin      = require('gulp-imagemin'),
    // Path
    PATH          = require('./paths.json'),
    // Html
    handlebars    = require('gulp-compile-handlebars'),
    HTML_minify    = require('gulp-htmlmin'),
    rename        = require('gulp-rename'),
    useref        = require('gulp-useref'),
    // Styles
    CSS_sass      = require('gulp-sass'),
    CSS_prefixer  = require('gulp-autoprefixer'),
    CSS_minfyer   = require('gulp-cssmin'),
    // Script
    JS_browserify = require('gulp-browserify'),
    JS_uglify     = require('gulp-uglify');
// -----------------------



///////////////////////////
//         TACKS        //
//////////////////////////


/**  Handlebars **/
gulp.task('handlebars', function() {
  templateData = require(PATH.src.templateData);
  for(var i=0; i<templateData.length; i++) {
    var dato = templateData[i],
      fileName = dato.fileName.replace(/ +/g, '-').toLowerCase();

    gulp.src(PATH.src.template)
      .pipe(handlebars(dato))
      .pipe(rename(fileName + ".html"))
      .pipe(gulp.dest(PATH.dest.host))
      .pipe(browserSync.reload({
        stream:true
      }))
  }
})

/**  SASS **/
.task('sass', function() {
  return gulp.src(PATH.src.styles)
    .pipe(CSS_sass().on('error', CSS_sass.logError))
    // aca tendria que poner el autoprefixer
    .pipe(CSS_prefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(PATH.dest.styles))
    .pipe(browserSync.reload({
      stream: true
    }))
})

/** BROWSERIFY **/
.task('browserify:dev', function() {
  return gulp.src(PATH.src.scripts)
    .pipe(JS_browserify({
      insertGlobals: true,
      debug: true
    }))
    .on('error', function(error) {
      console.log(error.message);
    })
    .pipe(JS_uglify())
    .pipe(gulp.dest(PATH.dest.app))
    .pipe(browserSync.reload({
      stream: true
    }))
})

/**  BROWSE SYNC:DEV **/
.task('browserSync:dev', function() {
  browserSync({
    port: 9000,
    server: {
      baseDir: [PATH.dest.host],
      routes: {"/bower_components":"bower_components"}
    }
  })
})
/*
 * IMAGES
 */
.task('images:dev', function() {
  return gulp.src(PATH.src.img)
    // Caching images that ran through imagemin
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{
        cleanupIDs: false
      }]
    }))
    .pipe(gulp.dest(PATH.dest.img))
})

/*
 * FONTS
 */
.task('fonts:dev', function() {
  return gulp.src(PATH.src.fonts)
    .pipe(gulp.dest(PATH.dest.fonts))
})

/*************************************************/
  .task('useref', function () {
      return gulp.src(PATH.src.template)
          .pipe(useref({
            searchPath:[ 'app', 'dist']
          }))
          .pipe(gulpif('*.js', JS_uglify()))
          .pipe(gulpif('*.css', CSS_minfyer()))
          .pipe(gulpif('*.html', HTML_minify({
              removeComments: true,
              collapseWhitespace: true
          })))
          .pipe(gulp.dest("dist"));
  })

  /**  Handlebars **/
  .task('minifyHtml', function() {
    templateData = require(PATH.src.templateData);
    for(var i=0; i<templateData.length; i++) {
      var dato = templateData[i],
        fileName = dato.fileName.replace(/ +/g, '-').toLowerCase();

      gulp.src(PATH.src.template)
        .pipe(handlebars(dato))
        .pipe(rename(fileName + ".html"))
        .pipe(useref())
        //.pipe(HTML_minify({collapseWhitespace: true}))
        .pipe(gulp.dest(PATH.dist.host))
        .pipe(browserSync.reload({
          stream:true
        }))
    }
  })

  /**  SASS **/
  .task('minifyCss', function() {
    return gulp.src(PATH.src.styles)
      .pipe(CSS_sass().on('error', CSS_sass.logError))
      // aca tendria que poner el autoprefixer
      .pipe(CSS_prefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      //.pipe(CSS_minfyer())
      .pipe(gulp.dest(PATH.dist.styles))
      .pipe(browserSync.reload({
        stream: true
      }))
  })

  /** BROWSERIFY **/
  .task('browserify:dist', function() {
    return gulp.src(PATH.src.scripts)
      .pipe(JS_browserify({
        insertGlobals: true,
        debug: true
      }))
      .on('error', function(error) {
        console.log(error.message);
      })
      //.pipe(JS_uglify())
      .pipe(gulp.dest(PATH.dist.app))
      .pipe(browserSync.reload({
        stream: true
      }))
  })

  /**  BROWSE SYNC:DEV **/
  .task('browserSync:dist', function() {
    browserSync({
      port: 9000,
      server: {
        baseDir: [PATH.dist.host]
      }
    })
  })

  /*
   * IMAGES
   */
  .task('images', function() {
    return gulp.src(PATH.src.img)
      // Caching images that ran through imagemin
      .pipe(imagemin({
        progressive: true,
        interlaced: true,
        // don't remove IDs from SVGs, they are often used
        // as hooks for embedding and styling
        svgoPlugins: [{
          cleanupIDs: false
        }]
      }))
      .pipe(gulp.dest(PATH.dist.img))
  })

  /*
   * FONTS
   */
  .task('fonts', function() {
    return gulp.src(PATH.src.fonts)
      .pipe(gulp.dest(PATH.dist.fonts))
  })
/*************************************************/


/** WATCH **/
.task('watch', ['handlebars', 'sass', 'browserify:dev', 'browserSync:dev'], function() {
  gulp.watch(PATH.src.template, ['handlebars', browserSync.reload]);
  gulp.watch(PATH.src.styles,   ['sass', browserSync.reload]);
  gulp.watch(PATH.src.scripts,  ['browserify:dev', browserSync.reload]);
})

.task('default', function () {
  if (!fileSistem.existsSync(PATH.bower.host)) {
    console.log("instalando dependencias de bower...\n al finalizar, vuelve a correr el comando gulp \n");
    function show(error, stdout, stderr) {
      console.log(error, stdout)
    };
    exec("bower install", show);
  } else {
    console.log('bower components ya estan instalados\n');
    runSequence(
      'dist'
    );
  }
})

.task('dev', function (callback) {
  runSequence(
    [
      'images:dev',
      'fonts:dev'
    ],
    'watch',
    callback
  )
})

.task('dist', function () {
  runSequence(
    [
      'images',
      'fonts',
      'minifyCss',
      'browserify:dist'
    ],
    'useref',
    'browserSync:dist'
  )
});

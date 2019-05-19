const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const spawn = require('child_process').spawn;
const babel = require('gulp-babel');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const streamify = require('gulp-streamify');
const uglify = require('gulp-uglify');

let node;

gulp.task('browserify', (done) => {
  browserify('app/assets/javascript/main.js')
    .bundle()
    .on('error', function (err) {
      gutil.log(gutil.colors.red('Browserify compilation error:'));
      gutil.log(err);
      this.emit('end');
    })
    .pipe(plumber())
    .pipe(source('main.js'))
    .pipe(streamify(babel({ presets: ['es2015'] }))) // babel doesn't support streaming
    .pipe(streamify(uglify())) // uglify doesn't support streaming
    .pipe(gulp.dest('dist/public/javascript'));
  done();
});

gulp.task('js-vendor', (done) => {
  gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
  ]).pipe(gulp.dest('dist/public/javascript'));
  done();
});

gulp.task('javascript', gulp.parallel(['browserify', 'js-vendor']));

gulp.task('css', (done) => {
  gulp.src('app/assets/stylesheets/*.scss')
    .pipe(plumber())
    .pipe(
      sass({
        includePaths: [
          'src/assets/stylesheets',
        ],
      }))
    .pipe(gulp.dest('dist/public/stylesheets/'));
  done();
});

gulp.task('fonts', (done) => {
  gulp.src('app/assets/fonts/**/*.*')
    .pipe(plumber())
    .pipe(gulp.dest('dist/public/fonts'));
  done();
});

gulp.task('images', (done) => {
  gulp.src('app/assets/images/*.*')
    .pipe(plumber())
    .pipe(gulp.dest('dist/public/images'));
  done();
});

gulp.task('server', (done) => {
  if (node) node.kill();
  node = spawn('node', ['bin/www'], { stdio: 'inherit' });
  node.on('close', (code) => {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
  done();
});

gulp.task('watch', gulp.parallel(['javascript', 'css', 'fonts', 'images', 'server'], (done) => {
  gulp.watch(['app/**/*.js', 'bin/www'], ['server']);
  gulp.watch('app/assets/stylesheets/*.scss', ['css']);
  gulp.watch('app/assets/javascript/**/*.js', ['browserify']);
  gulp.watch('app/assets/fonts/**/*.*', ['fonts']);
  gulp.watch('app/assets/images/*.*', ['images']);
  done();
}));

gulp.task('default', gulp.parallel(['javascript', 'css', 'fonts', 'images']));

// clean up if an error goes unhandled.
process.on('exit', () => {
  if (node) node.kill();
});


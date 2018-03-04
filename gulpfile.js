const gulp = require('gulp')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')

const paths = {
  scripts: {
    src: 'src/**/*.js',
    dest: 'dist'
  }
}

const moveEnvFile = () => gulp.src('src/.env', { allowEmpty: true }).pipe(gulp.dest(paths.scripts.dest))

const test = () => {
  console.log(process.env.authKey)
  console.log(global.authKey)
  console.log(process.env.authSecret)
  console.log(process.env.authSecret[4])
}

const compress = () => (
  gulp.src(paths.scripts.src, { sourcemaps: true })
    .pipe(babel({
      presets: ['babel-preset-env'],
      plugins: [
        ["transform-runtime", {
          "helpers": false,
          "polyfill": false,
          "regenerator": true
        }]
      ]
		}))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
)

gulp.task('build', gulp.parallel(compress, moveEnvFile, test))

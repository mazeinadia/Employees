const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('js', () =>
gulp.src('src/**/*.js')
    .pipe(babel({
        presets: ["env"]
    }))
    .pipe(concat())
    .pipe(gulp.dest('bundle.js'))
);
const gulp = require('gulp'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    connect = require('gulp-connect');

gulp.task('connect', () =>
    connect.server({
        livereload: true
    })
);


gulp.task('js', () =>
    gulp.src('src/**/*.js')
    .pipe(babel({
        presets: ["env"]
    }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('public'))
    .pipe(connect.reload())
);

gulp.task('html', () =>
    gulp.src('index.html')
        .pipe(connect.reload())
);

gulp.task('watch', () => {
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('index.html', ['html'])
});

gulp.task('default', ['connect', 'js', 'html', 'watch']);
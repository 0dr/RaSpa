const pug = require('gulp-pug')
const stylus = require('gulp-stylus')
const gulp = require('gulp')

gulp.task('css', () => {
    return gulp.src('./app/RaSpa.styl')
    .pipe(stylus())
    .pipe(gulp.dest('../'))
})

gulp.task('html', () => {
    return gulp.src('./app/RaSpa.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('../'))
})

gulp.task('watch', gulp.series(['css', 'html'], () => {
    gulp.watch('./app/**/*.styl', gulp.series(['css']))
    gulp.watch(['./app/**/*.pug','./app/**/*.js'], gulp.series(['html']))
}))

gulp.task('build',  gulp.series(['css','html']))

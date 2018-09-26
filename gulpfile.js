const gulp = require('gulp');
const browserSync = require('browser-sync');

// Serve files
gulp.task('serve', () => {
	browserSync.init({
		server: "./dist"
	});

	gulp.watch('src/*').on('change', browserSync.reload);
});
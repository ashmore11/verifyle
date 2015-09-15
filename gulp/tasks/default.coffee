gulp = require 'gulp'

gulp.task "build",   ['scripts', 'styles']
gulp.task "default", ['build', 'watch', 'server']
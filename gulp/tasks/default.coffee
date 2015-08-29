gulp = require 'gulp'

gulp.task "build",   ['scripts']
gulp.task "default", ['build', 'watch']
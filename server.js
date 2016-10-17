var browserSync = require('browser-sync').create()
var historyApiFallback = require('connect-history-api-fallback')

browserSync.init({
  server: './',
  files: ['src/**/*.*'],
  middleware: [require('connect-logger')(), historyApiFallback()]
})

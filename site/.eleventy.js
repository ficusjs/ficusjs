module.exports = function(eleventyConfig) {
  eleventyConfig.addShortcode("serviceWorker", function () {
    if (process.env.NODE_ENV === 'production') {
      return `<script src="js/service-worker.js"></script>`
    }
  })
}

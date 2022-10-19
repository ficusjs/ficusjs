const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight")
const CleanCSS = require("clean-css")
const htmlMinifier = require("html-minifier")
const markdownIt = require('markdown-it')
const slugify = require("slugify")
const pluginTOC = require('eleventy-plugin-nesting-toc')
const markdownItAnchor = require('markdown-it-anchor')
const markdownItToc = require('markdown-it-table-of-contents')
const markdownItNamedHeadings = require("markdown-it-named-headings")
const markdownItEmoji = require('markdown-it-emoji')

module.exports = function(eleventyConfig) {
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
    if (outputPath.endsWith(".html")) {
      let minified = htmlMinifier.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true
      })
      return minified
    }
    return content
  })

  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles
  })

  eleventyConfig.addShortcode("serviceWorker", function () {
    if (process.env.NODE_ENV === 'production') {
      return `<script>window.onload=function(){"serviceWorker"in navigator&&navigator.serviceWorker.register('/sw.js')};</script>`
    }
    return ''
  })

  eleventyConfig.addPlugin(syntaxHighlight)

  function removeExtraText(s) {
    let newStr = String(s).replace(/New\ in\ v\d+\.\d+\.\d+/, "")
    newStr = newStr.replace(/Coming\ soon\ in\ v\d+\.\d+\.\d+/, "")
    newStr = newStr.replace(/⚠️/g, "")
    newStr = newStr.replace(/[?!#]/g, "")
    newStr = newStr.replace(/<[^>]*>/g, "")
    return newStr;
  }

  function markdownItSlugify(s) {
    return slugify(removeExtraText(s), { lower: true, remove: /[:’'`,]/g })
  }

  let mdIt = markdownIt({
    html: true,
    breaks: true
  })
    .use(markdownItNamedHeadings)
    .use(markdownItToc, {
      includeLevel: [2, 3, 4, 5],
      slugify: markdownItSlugify,
      format: function(heading) {
        return removeExtraText(heading)
      },
      transformLink: function(link) {
        // remove backticks from markdown code
        return link.replace(/\%60/g, "")
      }
    })
    .use(markdownItEmoji);

  eleventyConfig.setLibrary("md", mdIt)

  eleventyConfig.addPlugin(pluginTOC, {
    tags: ['h2', 'h3', 'h4', 'h5'],
    wrapperClass: 'toc__nav',
    ul: true,
    ignoredElements: ['.fd-direct-link']
  })
}

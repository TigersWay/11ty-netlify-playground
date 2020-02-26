module.exports = {
  locale: 'en',
  flag: 'Flag!',
  eleventyComputed: {
    upperTitle: data => (typeof(data.eleventyComputed) != 'undefined') ? data.title.toUpperCase() : 'undefined'
  }
}

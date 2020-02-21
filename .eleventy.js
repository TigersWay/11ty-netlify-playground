const glob = require('fast-glob');

module.exports = function (eleventyConfig) {

  // Filters
  glob.sync('{.11ty,.netlify}/filters/*.js').forEach(file => {
    let filters = require('./' + file);
    Object.keys(filters).forEach(name => {
      eleventyConfig.addFilter(name, filters[name])
    });
  });

  // Shortcodes
  glob.sync('{.11ty,.netlify}/shortcodes/*.js').forEach(file => {
    let shortcodes = require('./' + file);
    Object.keys(shortcodes).forEach(name => {
      eleventyConfig.addShortcode(name, shortcodes[name])
    });
  });

  return {
    // templateFormats: ['md', 'njk', 'html', '11ty.js'],
    // markdownTemplateEngine: 'njk',
    // htmlTemplateEngine: 'njk',
    // dataTemplateEngine: 'njk',

    dir: {
      input: './src',
      layouts: '_theme',
      includes: '_theme/includes',
      data: '_data',
      output: './public'
    }
  }
}

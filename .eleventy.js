const glob = require('fast-glob');

module.exports = function (eleventyConfig) {

  // Filters
  glob.sync('{_11ty,_netlify}/filters/*.js').forEach(file => {
    let filters = require('./' + file);
    Object.keys(filters).forEach(name => {
      eleventyConfig.addFilter(name, filters[name])
    });
  });

  // Shortcodes
  glob.sync('{_11ty,_netlify}/shortcodes/*.js').forEach(file => {
    let shortcodes = require('./' + file);
    Object.keys(shortcodes).forEach(name => {
      eleventyConfig.addShortcode(name, shortcodes[name])
    });
  });

  // Paired shortcodes
  glob.sync('{_11ty,_netlify}/pairedShortcodes/*.js').forEach(file => {
    let paired = require('./' + file);
    Object.keys(paired).forEach(name => {
      eleventyConfig.addPairedShortcode(name, paired[name])
    });
  });

  // Markdown engine &  plugins
  eleventyConfig.setLibrary(
    'md',
    require('markdown-it')({
      html: true,
      linkify: true,
      typographer: true
    })
    .use(require('markdown-it-attrs'), {
      allowedAttributes: ['id', 'class']
    })
    .use(require('markdown-it-emoji/light'))
  );

  eleventyConfig.setDataDeepMerge(true);

  return {
    templateFormats: ['html', 'md', 'njk', '11ty.js'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',

    dir: {
      input: './site',
      layouts: '_theme',
      includes: '_theme/includes',
      data: '_data',
      output: './public'
    }
  }
}

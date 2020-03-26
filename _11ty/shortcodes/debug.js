const stringKit = require('string-kit');


module.exports = {

  debug: (o, depth = 2, minimal = true, blackList = ['templateContent', '_templateContent']) => {
    return '<pre class="Eleventy">' +
      stringKit.inspect({
        style: 'html',
        depth: depth,
        // maxLength: 250,
        outputMaxLength: 20*1024,
        minimal: minimal,
        propertyBlackList: new Set(blackList)
      }, o) +
      '</pre>';
  }

};

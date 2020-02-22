const multimatch = require('multimatch');
const path = require('path');

module.exports = {

  branches: (collection, page) => {
    let pathname = path.dirname(page.inputPath);
    return collection.filter(item => {
      // return Boolean(multimatch([item.inputPath], [pathname + '/*/index.*']).length);
      return Boolean(multimatch(item.inputPath, pathname + '/*/index.*').length);
    });
  },

  leaves: (collection, page) => {
    let pathname = path.dirname(page.inputPath);
    return collection.filter(item => {
      // return Boolean(multimatch([item.inputPath], [pathname + '/*/index.*']).length);
      return Boolean(multimatch(item.inputPath, [pathname + '/*.*', '!' + pathname + '/index.*']).length);
    });
  }

}

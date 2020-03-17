const multimatch = require('multimatch');
const path = require('path');


const getProperty = (obj, name) => {
  return name.split('.').reduce((previous, current) => {
    return previous ? previous[current] : undefined;
  }, obj);
};

function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    const varA = getProperty(a, key);
    const varB = getProperty(b, key);

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return ( (order === 'desc') ? (comparison * -1) : comparison );
  };
}

module.exports = {

  tagList: (collection, excepts = ['all', 'nav', 'page', 'pages', 'post', 'posts']) => {
    let tagSet = new Set();
    collection.forEach(item => {
      if (item.data.tags) {
        item.data.tags
          .filter(item => !excepts.includes(item))
          .forEach(item => tagSet.add(item));
      }
    });
    return [...tagSet];
  },

  branches: (collection, page) => {
    let pathname = path.dirname(page.inputPath);
    return collection.filter(item => {
      return Boolean(multimatch(item.inputPath, pathname + '/*/index.*').length);
    });
  },

  leaves: (collection, page) => {
    let pathname = path.dirname(page.inputPath);
    return collection.filter(item => {
      return Boolean(multimatch(item.inputPath, [pathname + '/*.*', '!' + pathname + '/index.*']).length);
    });
  },

  deepLeaves: (collection, page) => {
    let pathname = path.dirname(page.inputPath);
    return collection.filter(item => {
      return Boolean(multimatch(item.inputPath, [pathname + '/**', '!' + pathname + '/index.*']).length);
    });
  },

  sort: (collection, key, order = 'asc') => {
    return collection.sort(compareValues(key, order));
  }

};

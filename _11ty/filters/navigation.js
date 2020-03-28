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


let cache = {};

const buildNavigation = (collection) => {
  collection.forEach((page, index) => {
    cache[page.filePathStem] = {item: index, parent: null, branches: [], leaves: []};
  });

  Object.keys(cache).forEach(key => {
    let parent = key;
    if (parent.endsWith('/index')) {
      parent = path.dirname(parent);
      while (parent.length > 1) {
        parent = path.dirname(parent);
        if (cache.hasOwnProperty(parent + 'index')) {
          cache[key].parent = cache[parent + 'index'].item;
          cache[parent + 'index'].branches.push(cache[key].item);
          break;
        }
      }
    } else {
      do {
        parent = path.dirname(parent);
        if (cache.hasOwnProperty(parent + '/index')) {
          cache[key].parent = cache[parent + '/index'].item;
          cache[parent + '/index'].leaves.push(cache[key].item);
          break;
        }
      } while (parent.length > 1);
    }
  });

  return cache;
};

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
    return [...tagSet].sort();
  },

  find: (collection, filePathStem) => collection[cache[filePathStem].item],

  branches: (collection, page) => {
    let branches = [];
    cache[page.filePathStem].branches.forEach(index => {
      branches.push(collection[index]);
    });
    return branches;
  },

  leaves: (collection, page) => {
    let leaves = [];
    cache[page.filePathStem].leaves.forEach(index => {
      leaves.push(collection[index]);
    });
    return leaves;
  },

  deepLeaves: (collection, page) => {
    let pathname = path.dirname(page.inputPath);
    return collection.filter(item => {
      return Boolean(multimatch(item.inputPath, [pathname + '/**', '!' + pathname + '/index.*']).length);
    });
  },

  sort: (collection, key, order = 'asc') => {
    return collection.sort(compareValues(key, order));
  },

  buildNavigation: buildNavigation

};

const multimatch = require('multimatch');
const path = require('path');


const getProperty = (obj, name) => {
  return name.split('.').reduce((previous, current) => {
    return previous ? previous[current] : undefined;
  }, obj || self);
};

function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
//     if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) return 0;
//
//     const varA = (typeof a[key] === 'string') ? a[key].toUpperCase() : a[key];
//     const varB = (typeof b[key] === 'string') ? b[key].toUpperCase() : b[key];
    const varA = getProperty(a, key);
    const varB = getProperty(b, key);

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}

module.exports = {

  tagList: (collection, excepts = ['all', 'nav', 'page', 'post']) => {
    let tagSet = new Set();
    collection.forEach(item => {
      if( "tags" in item.data ) {
        let tags = item.data.tags;

        tags = tags.filter(function(item) {
          switch(item) {
            // this list should match the `filter` list in tags.njk
            case "all":
            case "nav":
            case "post":
            case "posts":
              return false;
          }

          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    return [...tagSet];
  },

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

}

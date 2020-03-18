const { inspect } = require('util');

const ANSItoHTML = (str) => {
  /*eslint no-control-regex: "off"*/
  return str
    .replace(/\x1B\[32m/g, '<font color="#00A000"><b>')  // Green = string, symbol
    .replace(/\x1B\[33m/g, '<font color="#D0D000"><b>')  // Yellow = bigint, boolean. number
    .replace(/\x1B\[35m/g, '<font color="#FF00FF"><b>')  // Magenta = date
    .replace(/\x1B\[36m/g, '<font color="#00E0E0"><b>')  // Cyan = special
    .replace(/\x1B\[90m/g, '<font color="#0A0A0A"><b>')  // Grey = undefined
    .replace(/\x1B\[39m/g, '</b></font>');
};

exports.debug = (variable, depth = 1) => {
  // return '<pre>' + JSON.stringify(variable, null, depth) + '</pre>';
  return '<pre>' + ANSItoHTML(inspect(variable, {
    depth: depth,
    colors: true,
    sorted: true,
  })) + '</pre>';
};

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');


const mimeTypes = {
  '.jpeg': 'image/jpeg',
  '.jpg':  'image/jpeg',
  '.png':  'image/png',
  '.webp': 'image/webp'
};

let rootImages;


const transformImage = (req, res, next) => {

  let matches = req.url.match(/^(.*?(?:jpg|jpeg|png)).*?nf_resize=(fit|smartcrop)/);
  if (matches) {
    let filename = path.join(rootImages, decodeURI(matches[1]));
    fs.access(filename, fs.constants.R_OK, (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });

    res.setHeader('Expires', new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toUTCString());
    res.setHeader('Cache-control', 'max-age=31536000, public');
    res.setHeader('Last-Modified', new Date().toUTCString());

    if (req.headers['if-modified-since']) {

      res.statusCode = 304;
      res.setHeader('Last-Modified', req.headers['if-modified-since']);
      return;

    } else {

      let options = {
        fit: sharp.fit.cover,
        position: sharp.strategy.entropy
      };
      options.width = (matches = req.url.match(/(?:\?|&)w=(\d*)/)) ? parseInt(matches[1]) : null;
      options.height = (matches = req.url.match(/(?:\?|&)h=(\d*)/)) ? parseInt(matches[1]) : null;

      res.setHeader('content-type', mimeTypes[path.extname(filename)]);

      fs.createReadStream(filename)
        .on('error', (err) => {
          console.error(err);
          return;
        })
        .pipe(sharp().resize(options))
        .pipe(res);

    }
  } else next();
};


module.exports = (root) => {

  rootImages = root;

  return transformImage;

};

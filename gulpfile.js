// Gulp & Options

const {src, dest, watch, series, parallel} = require('gulp');
const $ = require('gulp-load-plugins')();

// Variables & parameters

const isProduction = require('has-flag')('production');
const pkg = require('./package.json');
const destPath = 'public';

// Tasks

const clean = async () => {
  return await require('del')([destPath]);
}

const copyStatic = () => {
  return src(['static/**'])
    .pipe(dest(destPath + '/static'));
}

const buildHTML = (cb) =>  {
  var exec = require('child_process').exec;
  exec(`npx eleventy ${isProduction ? ' --quiet' : ''}`, (error, stdout, stderr) => {
    process.stdout.write(stdout);
    if (error) console.error(stderr);
    cb(error);
  });
}
const watchHTML = () => {return watch(['src/**/*', '.eleventy.js', '{.11ty,.netlify}/{filters,shortcodes}/*.js'], buildHTML)}

const serve = () => {
  return require('browser-sync').init({
      server: destPath,
      files: [
        destPath + '/**/*.html',
        destPath + '/css/*.css'
      ],
      browser: ['C:/Program Files/Firefox Developer Edition/firefox.exe']
    });
}


exports.build = series(
  clean,
  parallel(copyStatic, buildHTML)
);

exports.live = series(
  parallel(buildHTML),
  parallel(watchHTML, serve)
);

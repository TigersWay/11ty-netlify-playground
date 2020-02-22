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

const copyMisc = () => {
  return src([
      'src/favicon.ico',
      'src/humans.txt'
    ])
    .pipe(dest(destPath));
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
const watchHTML = () => {return watch(['src/**/*', '.eleventy.js', '{_11ty,_netlify}/{filters,shortcodes}/*.js'], buildHTML)}

const buildCSS = () => {
  return src('src/css/styles.css')
    .pipe($.cleanCss({
      format: {
        breakWith: 'unix',
        breaks: {afterComment: true, afterRuleEnds: (destPath === 'dev')}
      },
      level: {
        1: {specialComments: '1'},
        2: {restructureRules: true}
      }
    }))
    .pipe($.rename({suffix: '.min'}))
    .pipe(dest(destPath + '/css'));
}
const watchCSS = () => {return watch('src/css/**/*.css', buildCSS)}


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

exports.clean = clean;

exports.build = series(
  clean,
  parallel(copyMisc, copyStatic, buildHTML, buildCSS)
);

exports.live = series(
  parallel(buildHTML, buildCSS),
  parallel(watchHTML, watchCSS, serve)
);

// Gulp & Options

const {src, dest, watch, series, parallel} = require('gulp');
const $ = require('gulp-load-plugins')();

// Variables & parameters

const hasFlag = require('has-flag');
const isProduction = hasFlag('production');
const isQuiet = hasFlag('quiet');

const pkg = require('./package.json');
const destPath = 'public';

// Tasks

const clean = async () => {
  return await require('del')([destPath +'/*', '!' + destPath + '/static']);
}

const copyMisc = () => {
  return src([
      'site/favicon.ico',
      'site/humans.txt'
    ])
    .pipe(dest(destPath));
}

const buildHTML = (cb) =>  {
  var exec = require('child_process').exec;
  exec(`npx eleventy ${(isProduction || isQuiet) ? ' --quiet' : ''}`, (error, stdout, stderr) => {
    process.stdout.write(stdout);
    if (error) console.error(stderr);
    cb(error);
  });
}
const watchHTML = () => {return watch(['site/**/*', '.eleventy.js', '{_11ty,_netlify}/**/*.js'], buildHTML)}

const buildCSS = () => {
  return src('site/_theme/*.css')
    .pipe($.hb().data({pkg: pkg}))
    .pipe($.postcss([
      require('tailwindcss'),
      require('postcss-nesting'),
      require('postcss-custom-properties'),
      require('autoprefixer')
    ]))
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
const watchCSS = () => {return watch('site/_theme/*.css', buildCSS)}


const serve = () => {
  const transformImage = require('./_netlify/transform-image-middleware.js')(destPath + '/static/images');

  return require('browser-sync').init({
      server: destPath,
      middleware: [{
        route: '/static/images',
        handle: transformImage
      }],
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
  parallel(copyMisc, buildHTML, buildCSS)
);

exports.live = series(
  parallel(buildHTML, buildCSS),
  parallel(watchHTML, watchCSS, serve)
);

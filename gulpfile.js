// Gulp & Options

const {src, dest, watch, series, parallel} = require('gulp');
const $ = require('gulp-load-plugins')();

// Variables & parameters

require('dotenv').config();

const hasFlag = require('has-flag');
const isQuiet = hasFlag('quiet');

const pkg = require('./package.json');
const destPath = 'public';

// Tasks

const clean = async () => {
  return await require('del')([destPath +'/*', '!' + destPath + '/static']);
};

const copyMisc = () => {
  return src(['site/favicon.ico', 'site/humans.txt'])
    .pipe(dest(destPath));
};

const buildHTML = (cb) =>  {
  require('child_process').exec(`npx eleventy ${isQuiet ? ' --quiet' : ''}`, (error, stdout) => {
    process.stdout.write(stdout);
    // if (error) console.error(stderr);
    cb(error);
  });
};
const watchHTML = () => {return watch(['site/**/*', '.eleventy.js', '{_11ty,_netlify}/**/*.js'], buildHTML);};

const buildCSS = () => {
  return src('site/_theme/css/*.css')
    .pipe($.hb().data({pkg: pkg}))
    .pipe($.postcss([
      require('tailwindcss')('./site/_theme/tailwind.config.js'),
      require('postcss-nesting'),
      require('postcss-custom-properties'),
      require('autoprefixer'),
      ...(process.env.NODE_ENV === 'production')
        ? [require('@fullhuman/postcss-purgecss')({
          content: ['./site/**/*.*'],
          defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || []

        })]
        : []
    ]))
    .pipe($.cleanCss({
      format: {
        breakWith: 'unix',
        breaks: {afterComment: true, afterRuleEnds: (process.env.NODE_ENV !== 'production')}
      },
      level: {
        1: {specialComments: '1'},
        2: {restructureRules: true}
      }
    }))
    .pipe($.rename({suffix: '.min'}))
    .pipe(dest(destPath + '/css'));
};
const watchCSS = () => {return watch(['site/_theme/css/*.css', 'site/_theme/tailwind.config.js'], buildCSS);};

const buildJS = () => {
  return src(['site/_theme/js/**/*.js'])
    .pipe($.concat('scripts.js'))
    .pipe($.uglify())
    .pipe($.rename({suffix: '.min'}))
    .pipe(dest(destPath + '/js'));
};
const watchJS = () => {return watch(['site/theme/js/**/*.js'], buildJS);};


const serve = () => {
  const transformImage = require('./_netlify/transform-image-middleware.js')(destPath + '/static/images');

  return require('browser-sync')
    .init({
      server: destPath,
      middleware: [{
        route: '/static/images',
        handle: transformImage
      }],
      files: [
        destPath + '/**/*.html',
        destPath + '/css/*.css',
        destPath + '/js/*.js'
      ],
      browser: [
        // 'C:/Program Files/Firefox Developer Edition/firefox.exe',
        ...(process.env.BROWSER) ? [process.env.BROWSER] : ['C:/Program Files/Firefox Developer Edition/firefox.exe'],
      ]
    });
};

exports.clean = clean;

exports.build = series(
  clean,
  parallel(copyMisc, buildHTML, buildCSS, buildJS)
);

exports.live = series(
  parallel(buildHTML, buildCSS, buildJS),
  parallel(watchHTML, watchCSS, watchJS, serve)
);

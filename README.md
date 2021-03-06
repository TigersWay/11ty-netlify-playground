# 11ty-netlify-playground
Exploring the Static Generator 'Eleventy / 11ty'

![GitHub package.json version](https://img.shields.io/github/package-json/v/tigersway/11ty-netlify-playground?style=flat-square) ![GitHub last commit](https://img.shields.io/github/last-commit/tigersway/11ty-netlify-playground?style=flat-square)

### Dependencies & Result(s)
![GitHub package.json dependency version (subfolder of monorepo)](https://img.shields.io/github/package-json/dependency-version/TigersWay/11ty-netlify-playground/@11ty/eleventy)

[![Netlify Status](https://api.netlify.com/api/v1/badges/87fcccb7-3de5-4fde-815e-9e402010f1e7/deploy-status)](https://app.netlify.com/sites/11ty-netlify-playground/deploys)


### Explored features:
  - [Eleventy](https://11ty.io/)
  - [Gulp](https://gulpjs.com/)
  - [PostCSS](https://postcss.org/)
  - [TailwindCSS](https://tailwindcss.com/), [Tailwind UI](https://tailwindcss.com/) & [PurgeCSS](https://purgecss.com/)
  - [Debug in HTML](_11ty/shortcodes/debug.js)

### CHANGELOG
- **0.9.0** 2020-03-26 New iteration to "organize" content (Typed, Hierarchical, Modular, etc.)
  + [x] Debug in HTML
  + [x] TailwindCSS, TailwindUI, PostCSS


- **0.8.0** 2020-03-08 There's no quick way to set a working Atom's Markdown preview. So let's reorganize stuff
  + [x] Move static (LFS) to public, and so, avoid unnecessary copy.
  + [x] sitemap.xml
  + [x] Netlify CDN & Transform
  + [ ] CSS
  + [ ] Gallery
  + [ ] Google Maps
  + [ ] Nunjucks "extends"


- **0.7.2** 2020-02-26
  + [x] Markdown engine & plugins
  + [x] Branches & Leaves: Sort
  + [x] Paired shortcodes
  + [x] [\#481 Computed data](https://github.com/11ty/eleventy/issues/481)
  + [x] Tag list & pages


- **0.7.1** 2020-02-22
  + [x] LFS
  + [x] [\#935 Top level directory data file](https://github.com/11ty/eleventy/issues/935)
  + [x] Simple/Tag collections
  + [x] Netlify slow: added favicon and empty CSS
  + [x] First pick on Branches & Leaves (Navigation)


- **0.7.0** 2020-02-20
  + [x] Project re-start
  + [x] organize filters & shortcodes
  + [x] debug shortcode (util.inspect)

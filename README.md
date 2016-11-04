Device Info
======================
- [Installation](#installation)
- [Develoment Tacks](#develoment-tacks)
  - [Run server](#run-server)
  - [Build](#build)
- [Design](#design)
- [Technology Stack](#technology-stack)
  - [NPM Dev dependencies](#npm-dev-dependencies)
  - [Naming & Selectors](#naming-&-selectors)


Installation
------------

- Prerequisites (see _[Technology Stack](#technology-stack)_):

    * NodeJS with npm
    * Gulp
    * on Windows machines maybe requires [Visual Studio 2013 WD](https://www.visualstudio.com/downloads/download-visual-studio-vs#d-express-windows-desktop)

- Install:
    ```bash
    cd ~/code
    git clone git@gitlab-art.globallogic.com.ar:ko-team/life-front.git
    cd life-front
    git checkout develop
    npm install
    ```

Develoment Tacks
----------------

- Run server
  ```bash
  gulp dev
  ```
  Your default web browser should have opened [http://localhost:9000/](http://localhost:9000/)

- Build
  ```bash
  gulp dist
  ```
  That will create all the build files under the `dist` directory.
  If besides creating the builds you want to start a local server, instead run:
  ```bash
  gulp serve:dist
  ```

Design
------
- For designers recomend use [atlassian SourceTree](https://www.sourcetreeapp.com/).
- git Tutorial [atlassian git](https://www.atlassian.com/git/)

- Design Tack
  ```bash
  gulp design
  ```


Technology Stack
---------------

- [node](https://nodejs.org/en/ "gulp")
- [NPM](http://npmjs.org "NPM")
- [gulp](http://gulpjs.com "gulp")
- [Sass](http://sass-lang.com "Sass")

#### NPM Dev dependencies
- [gulp](https://www.npmjs.com/package/gulp)
- [del](https://www.npmjs.com/package/del)
- [run-sequence](https://www.npmjs.com/package/run-sequence)
- [browser-sync](https://www.npmjs.com/package/browser-sync)
- [gulp-browserify](https://www.npmjs.com/package/browserify)
- [gulp-cache](https://www.npmjs.com/package/gulp-cache)
- [gulp-minify-css](https://www.npmjs.com/package/gulp-minify-css)
- [gulp-minify-html](https://www.npmjs.com/package/gulp-minify-html)
- [gulp-if](https://www.npmjs.com/package/gulp-if)
- [gulp-imagemin](https://www.npmjs.com/package/gulp-imagemin)
- [gulp-less](https://www.npmjs.com/package/gulp-less)
- [gulp-sass](https://www.npmjs.com/package/gulp-sass)
- [gulp-useref](https://www.npmjs.com/package/gulp-useref)
- [gulp-uglify](https://www.npmjs.com/package/gulp-uglify)
- [gulp-autoprefixer](https://www.npmjs.com/package/gulp-autoprefixer)

#### Naming & Selectors
- Use BEM methodology [https://en.bem.info/method/](https://en.bem.info/method/)
- All IDs and classes should be prefaced with `clif_classname`, short for "Moms and Meals"
- All JS target ids and classes should be prefaced with `clif_JS_classname`, **CSS selectors should not be used as JS targets**
- Classes only for CSS
- As flat a CSS structure as possible (avoid nesting, specificity wars at all costs)
- Please do not use !important
- Mobile first - Use min-width media queries are extremely helpful when it comes to coding responsive websites because it reduces code complexity.

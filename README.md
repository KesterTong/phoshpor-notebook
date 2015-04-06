Phosphor-Notebook
=================

An implementation of the JUpyter-notebook frontend using [phosphor](https://phosphorjs/phosphor) and typescript. 

build phosphor itself, and softlink `phosphor/dist` into this repo `dist`.

link/move `dist/phosphor.d.ts` into `typings/phosphor/` and update `typings/tsd.d.ts` to match in order to `gulp docs`.



Build Source
------------

**Prerequisites**
- [git](http://git-scm.com/)
- [node](http://nodejs.org/)
- [gulp](http://gulpjs.com/) `npm install -g gulp`
- [tsd](https://github.com/DefinitelyTyped/tsd) `npm install -g tsd@next`

```
git clone https://github.com/Carreau/phosphor-notebook.git
cd phosphor-notebook
npm install
tsd reinstall -so
gulp
gulp notebook
```

Output will be placed in the `/notebook` directory.

spawn your preferred static file server to play with it. 
You also use `gulp watch` if you have the chrome livereload extension 
to refresh the page everytime you save. 

`gulp docs` should build the docs in notebook/docs.

PR welcome.

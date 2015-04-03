Phosphor
========

Note that this is still a fork of phosphor, we should find a way to make phosphor just a dependency

build phosphor itself, and softlink `phosphor/dist` into this repo `dist`.


Build Source
------------

**Prerequisites**
- [git](http://git-scm.com/)
- [node](http://nodejs.org/)
- [gulp](http://gulpjs.com/) `npm install -g gulp`
- [tsd](https://github.com/DefinitelyTyped/tsd) `npm install -g tsd@next`

```
git clone https://github.com/KesterTong/phosphor-notebook.git
cd phosphor-notebook
npm install
tsd reinstall -so
gulp
gulp notebook
```

Output will be placed in the `/notebook` directory.


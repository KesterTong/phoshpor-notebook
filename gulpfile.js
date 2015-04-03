/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, S. Chris Colbert
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

var del = require('del');
var concat = require('gulp-concat');
var gulp = require('gulp');
var header = require('gulp-header');
var nib = require('nib');
var rename = require('gulp-rename');
var stream = require('event-stream');
var stylus = require('gulp-stylus');
var typedoc = require('gulp-typedoc');
var typescript = require('gulp-typescript');
var livereload = require('gulp-livereload');
var webserver = require('gulp-webserver');


var typings = ['./typings/tsd.d.ts'];


var tsSources = [
    'notebook/app',
    'notebook/cell',
    'notebook/cellmodel',
    'notebook/index',
    'notebook/menu',
    'notebook/menubar',
    'notebook/menuitem',
    'notebook/notebook',
    'dist/phosphor'
].map(function(name) { return name + '.ts'; });


var stylSources = './notebook/notebook.styl';
gulp.task('serve', function(){
gulp.src('app')
    .pipe(webserver({
      root: '.',
      livereload: true,
      directoryListing: true,
      enable: true,
      open: true
}))
    })


gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('notebook/*', ['notebook']);
  gulp.watch('notebook/*.styl',['css']);
});



gulp.task('notebook', function() {
  var project = typescript.createProject({
    declarationFiles: false,
    noImplicitAny: true,
    target: 'ES5',
  });

  var sources = typings.concat([
    'dist/phosphor.d.ts',
    'notebook/cellmodel.ts',
    'notebook/menuitem.ts',
    'notebook/menu.ts',
    'notebook/menubar.ts',
    'notebook/cell.ts',
    'notebook/notebook.ts',
    'notebook/app.ts',
    'notebook/index.ts',
  ]);

  var src = gulp.src(sources)
    .pipe(typescript(project))
    .pipe(rename(function (path) {
      path.dirname += '/build'; }))
    .pipe(header('"use strict";\n'))
    .pipe(gulp.dest('notebook'))
    .pipe(livereload());

  return stream.merge(src);
});

gulp.task('css', function() {
  return gulp.src(stylSources)
    .pipe(stylus({ use: [nib()] }))
    //.pipe(rename('phosphor.css'))
    .pipe(gulp.dest('./notebook/build'))
    .pipe(livereload());
});


gulp.task('docs', function() {
  return gulp.src(typings.concat(tsSources))
    .pipe(typedoc({
      out: 'notebook/docs/',
      name: 'jupyter_notebook',
      target: 'ES5',
      mode: 'file',
      includeDeclarations: true 
    }));
});

gulp.task('default', ['dist']);

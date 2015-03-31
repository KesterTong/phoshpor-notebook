module example {

import render = phosphor.virtualdom.render;

function main(): void {
  var main = document.getElementById('main');
  render(Notebook.App({}), main);
}


window.onload = main;

}
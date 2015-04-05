module example {

    import render = phosphor.virtualdom.render;

    function main(): void {
      var main = document.getElementById('main');

      var notebook_app = Notebook.App({data:[
          {id: '1', value:'foo'},
          {id: '2', inputPromptNumber:14 , value:'this is a long test'}
        ]});
      window.app = notebook_app;
      render(notebook_app, main);
    }


    window.onload = main;

}

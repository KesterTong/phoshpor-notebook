module example {

    import render = phosphor.virtualdom.render;
    import notebook_data = demo_data;

    function main(): void {
      var main = document.getElementById('main');

      var notebook_app = Notebook.App({data:{cells:[
          {id: '1', value:'foo'},
          {id: '2', execution_count:14 , value:'this is a long test..'}
        ],
        notebook:notebook_data.notebook}
      });
      window.app = notebook_app;
      render(notebook_app, main);
    }


    window.onload = main;

}

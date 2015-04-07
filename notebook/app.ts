module Notebook {

    import CellModel = Cell.CellModel;
    import DOM = phosphor.virtualdom.dom;
    import Component = phosphor.components.Component;
    import IElement = phosphor.virtualdom.IElement;
    import IData = phosphor.virtualdom.IData;
    import createFactory = phosphor.virtualdom.createFactory;

    var div = DOM.div;

    export interface AppInitData extends IData {
        data:any
    }



    export class AppComponent extends Component<IData> {


      static tagName = 'div';

      static className = 'notebook_app command_mode';

      private cells:CellModel[];
      private selectedCellIndex:number;

      constructor() {
        if(!this.cells){
            this.cells = [
              {id: '1', source:'placeholder...'},
              {id: '2', execution_count:14 , source:'this is a long test'}
            ]
            }
        this.selectedCellIndex = 0;
        super();
      }

      newCell(): CellModel {
        var id = Math.random() * 4294967296;
        return {id: String(id), source:''}
      }
    
      init(data:AppInitData, children:IElement[]):void {
        console.log('init is called with data:', data);
        if(data.data.notebook){
            console.warn('loading notebook demo model')
            this.cells = data.data.notebook.cells.map(function(m:any){
                m.id = Math.random() * 4294967296;
                m.source = m.source.join('')
                return m
            })
        } else if(data.data.cells){
            //this.cells = data.data.cells;
        }
        super.init(data, children);
      }


      insertCellAbove(): void {
        console.log(this.selectedCellIndex);
        this.cells.splice(this.selectedCellIndex, 0, this.newCell());
        this.update();    
      }

      insertCellBelow(): void {
        this.cells.splice(this.selectedCellIndex + 1, 0, this.newCell());
        this.selectedCellIndex = this.selectedCellIndex + 1;
        this.update();    
      }

      deleteCell(): void {
        this.cells.splice(this.selectedCellIndex, 1);
        if (this.selectedCellIndex > 0) {
          this.selectedCellIndex = this.selectedCellIndex - 1;
        }
        this.update();    
      }

      select(index: number): void {
        this.selectedCellIndex = index;
        this.update()
      }

      doStuff():void {
        this.cells[0].source = 'Heyyyy';
        this.cells[0].execution_count = (this.cells[0].execution_count || 0)+1;
        this.update();
      }

      render(): IElement[] {
        return [
          div({id: 'header', style: {'display': 'block'}},
            div({id: 'header-container', classname: 'container'},
              div({id: 'ipython_notebook', classname: 'nav navbar-brand pull-left'})
            ),
            div({id: 'menubar-container', classname: 'container'},
              MenuBar({
                menus: [
                  {
                    title:'File',
                    items:[
                    { 
                      title:'change things',
                      onclick : () => this.doStuff()

                    }
                    
                    ],
                  },
                  {
                    title:'Edit',
                    items:[
                      {
                        title: 'Insert Cell Above',
                        onclick: () => this.insertCellAbove()
                      },
                      {
                        title: 'Insert Cell Below',
                        onclick: ()=>this.insertCellBelow()
                      },
                      {
                        title: 'Delete Cell',
                        onclick: () => this.deleteCell()
                      }
                    ],
                  }
                ]
              })
            )
          ),
          Notebook({
            key: 'nb',
            cells: this.cells,
            requestSelect: this.select.bind(this),
            selectedIndex: this.selectedCellIndex
          })
        ]
      }
    }

    export var App = createFactory(AppComponent);

}

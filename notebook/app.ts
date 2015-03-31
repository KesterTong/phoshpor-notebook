module Notebook {


import DOM = phosphor.virtualdom.dom;
import Component = phosphor.components.Component;
import IElement = phosphor.virtualdom.IElement;
import IData = phosphor.virtualdom.IData;
import createFactory = phosphor.virtualdom.createFactory;

var div = DOM.div;

interface ICellData extends IData {
}

export class AppComponent extends Component<IData> {

  static tagName = 'div';

  static className = 'notebook_app command_mode';

  private cells:CellModel[];
  private selectedCellIndex:number;

  constructor() {
    this.cells = [
      {id: '1'},
      {id: '2', inputPromptNumber:14}
    ]
    this.selectedCellIndex = 0;
    super();
  }

  newCell(): CellModel {
    var id = Math.random() * 4294967296;
    return {id: String(id)}
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
                items:[],
              },
              {
                title:'Edit',
                items:[
                  {
                    title: 'Insert Cell Above',
                    onclick: this.insertCellAbove.bind(this)
                  },
                  {
                    title: 'Insert Cell Below',
                    onclick: this.insertCellBelow.bind(this)
                  },
                  {
                    title: 'Delete Cell',
                    onclick: this.deleteCell.bind(this)
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
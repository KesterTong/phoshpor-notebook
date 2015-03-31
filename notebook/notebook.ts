module Notebook {

import DOM = phosphor.virtualdom.dom;
import Component = phosphor.components.Component;
import IElement = phosphor.virtualdom.IElement;
import IData = phosphor.virtualdom.IData;
import createFactory = phosphor.virtualdom.createFactory;

var div = DOM.div;

export interface INotebookData extends IData {
  cells: CellModel[]
  requestSelect: (i: number) => void
  selectedIndex?: number
}

export class NotebookComponent extends Component<INotebookData> {

  static tagName = 'div';

  beforeRender(): void {
    this.node.style.display = 'block';    
  }

  render(): IElement[] {
    return [
      div({id: 'notebook', tabIndex: -1},
        div({className: 'container', id: 'notebook-container'},
          this.data.cells.map(function(cellModel, index) {
            return Cell({
              model: cellModel,
              key: cellModel.id,
              selected: index == this.data.selectedIndex,
              requestSelect: this.data.requestSelect.bind(this, index)
            });
          }, this)
        ),
        div({className: 'end_space'})
      )
    ]
  }
}

export var Notebook = createFactory(NotebookComponent);

}
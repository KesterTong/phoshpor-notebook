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
    var cells = this.data.cells.map((m, i) => this.createCell(m, i));
    return [
      div({id: 'notebook', tabIndex: -1},
        div({className: 'container', id: 'notebook-container'}, cells),
        div({className: 'end_space'})
      )
    ]
  }

  createCell(model: CellModel, index: number): IElement {
    return Cell({
      model: model,
      key: model.id,
      selected: index === this.data.selectedIndex,
      requestSelect: () => this.data.requestSelect(index),
    });
  }
}

export var Notebook = createFactory(NotebookComponent);

}
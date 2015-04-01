module Notebook {

import DOM = phosphor.virtualdom.dom;
import Component = phosphor.components.Component;
import IElement = phosphor.virtualdom.IElement;
import IData = phosphor.virtualdom.IData;
import CodeMirror = phosphor.components.CodeMirrorFactory;
import createFactory = phosphor.virtualdom.createFactory;

var div = DOM.div;

export interface ICellData extends IData {
  model:CellModel;
  requestSelect:() => void
  selected:boolean;
}

export class CellComponent extends Component<ICellData> {

  static tagName = 'div';

  static className = 'cell code_cell rendered';

  constructor() {
    super();
    this.node.onclick = this.onclick.bind(this);
  }

  onclick(): void {
    this.data.requestSelect();
  }

  beforeRender(): void {
    this.node.className = 'cell code_cell rendered' + (this.data.selected ? ' selected' : '');
  }

  render(): IElement[] {
    var input_prompt_number = this.data.model.inputPromptNumber;
    var input_number = input_prompt_number === undefined ? ' ' : String(input_prompt_number);
    var input_prompt = 'In [' + input_number + ']:';
    
    return [
      div({className: 'input'},
        div({className: 'prompt input_prompt'}, input_prompt),
        div({className: 'inner_cell'},
          div({className: 'input_area'},
            CodeMirror({key: this.data.key + '-cm', config: {mode: 'python'}})
          )
        )
      )
    ]
  }
}

export var Cell = createFactory(CellComponent);

}
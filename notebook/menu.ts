module Notebook {

import DOM = phosphor.virtualdom.dom;
import Component = phosphor.components.Component;
import IElement = phosphor.virtualdom.IElement;
import IData = phosphor.virtualdom.IData;
import createFactory = phosphor.virtualdom.createFactory;

var div = DOM.div;
var li = DOM.li;
var ul = DOM.ul;
var a = DOM.a;

export interface IMenuData extends IData {
  title: string;
  items: IMenuItemData[];
}

export class MenuComponent extends Component<IMenuData> {

  static tagName = 'li';

  static className = 'dropdown';

  constructor() {
    super();
    this.isopen = false;
  }

  private isopen:boolean;

  onclick(): void {
    this.isopen = !this.isopen;
    this.update();
  }

  beforeRender(): void  {
    this.node.className = 'dropdown' + (this.isopen ? ' open' : '');    
  }

  render(): IElement[] {
    return [
      a({className:'dropdown-toggle', href:'#', 'data-toggle':'dropdown', onclick: this.onclick.bind(this)}, this.data.title),
      ul({className:'dropdown-menu'},
        this.data.items.map(function(itemData) {
          return MenuItem(itemData);
        })
      )
    ]
  }

}

export var Menu = createFactory(MenuComponent);

}

module Notebook {

import DOM = phosphor.virtualdom.dom;
import Component = phosphor.components.Component;
import IElement = phosphor.virtualdom.IElement;
import IData = phosphor.virtualdom.IData;
import createFactory = phosphor.virtualdom.createFactory;

var div = DOM.div;
var ul = DOM.ul;

export interface IMenuBarData extends IData {
  menus: IMenuData[];
}

export class MenuBarComponent extends Component<IMenuBarData> {

  static tagName = 'div';

  static className = 'navbar navbar-default';

  render(): IElement[] {
    return [
      div({className:'container-fluid'},
        div({className:'navbar-collapse collapse'},
          ul({className:'nav navbar-nav'},
            this.data.menus.map(function(menuData) {
              return Menu(menuData);
            })
          )
        )
      )
    ];
  }
}

export var MenuBar = createFactory(MenuBarComponent);

}
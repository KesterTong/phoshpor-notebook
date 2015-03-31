module Notebook {

import DOM = phosphor.virtualdom.dom;
import Component = phosphor.components.Component;
import IElement = phosphor.virtualdom.IElement;
import IData = phosphor.virtualdom.IData;
import createFactory = phosphor.virtualdom.createFactory;

var a = DOM.a;

export interface MenuOnClickCallback {
  (): void;
}

export interface IMenuItemData extends IData {
  title:string;
  onclick:MenuOnClickCallback;
}

export class MenuItemComponent extends Component<IMenuItemData> {

  static tagName = 'li';

  static className = '';

  render(): IElement[] {
    return [a({href: '#', onclick:this.data.onclick}, this.data.title)];
  }
}

export var MenuItem = createFactory(MenuItemComponent);

}
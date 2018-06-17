import { Component, Input, ContentChild, ContentChildren, TemplateRef, QueryList } from "@angular/core";

import { RxPermissionItemTemplateDirective } from './rx-permission-item-template.directive';
import { RxCellTemplateDirective } from './rx-cell-template.directive';
import { ApplicationPage } from '../core'


@Component({
  selector: 'rx-footer',
  template: ''
})
export class RxFooterComponent {
  @ContentChild(RxCellTemplateDirective) content: RxCellTemplateDirective;

  templateRef: TemplateRef<any>;

  get template(): TemplateRef<any> {
    return this.content ? this.content.templateRef : undefined;
  }
}

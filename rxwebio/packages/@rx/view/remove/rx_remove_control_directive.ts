import {Component, Directive, ElementRef, AfterViewInit, Input, ViewContainerRef, TemplateRef} from "@angular/core";
import { ActivatedRouteSnapshot} from "@angular/router"
import { user } from '../../security';

@Directive({ selector: '[rxRemove]' })
export class RxRemoveDirective {
    remove: boolean;
    element: Node;
    constructor(private viewContainer: ViewContainerRef, elementRef: ElementRef) {
        this.element = elementRef.nativeElement as Node;
    }

    @Input('rxRemove') set removeValue(accessItems:any[]) {
        //if (condition) {
        //    this.viewContainer.createEmbeddedView(this.template);
        //}
        //else {
        //    this.viewContainer.clear();
        //}
        if (accessItems.length == 1)
            this.remove = !(user.pagePermission[accessItems[0]]);
        else {
            let item;
            for (let accessItem of accessItems) {
                if (!item)
                    item = user.pagePermission[accessItem];
                else
                    item = item[accessItem]
                this.remove = !(item);
            }
        }
        if (this.remove) {
            var parentElement = this.getParentElement();
            parentElement.removeChild(this.element);
        }
    }

    private getParentElement(): Node {
        return this.element.parentNode;
    }
}


export class NgIfContext { public $implicit: any = null; }
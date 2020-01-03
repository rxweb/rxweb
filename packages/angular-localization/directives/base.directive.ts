import { ElementRef, Renderer, Input } from "@angular/core";
export abstract class BaseDirective{
    protected element: any;

    get component(): Function {
        if (this.viewContainerRef && this.viewContainerRef["_view"] && this.viewContainerRef["_view"].component) 
            return this.viewContainerRef["_view"].component.constructor;
        return null;
    }

    constructor(protected renderer: Renderer, protected elementRef: ElementRef, private viewContainerRef) {
        this.element = this.elementRef.nativeElement as Node
    }

}
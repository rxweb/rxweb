import { ElementRef, Renderer2, Input } from "@angular/core";
export abstract class BaseDirective{
    protected element: any;
    private _componentId: any = null;
    @Input() set componentId(value: string) {
        this._componentId = value;
    }

    get component(): Function {
        if (this._componentId == null && this.viewContainerRef && this.viewContainerRef["_view"] && this.viewContainerRef["_view"].component) 
            return this.viewContainerRef["_view"].component.constructor;
        return this._componentId;
    }

    constructor(protected renderer: Renderer2, protected elementRef: ElementRef, private viewContainerRef) {
        this.element = this.elementRef.nativeElement as Node
        this.element['isPopulated'] = false;
    }

}
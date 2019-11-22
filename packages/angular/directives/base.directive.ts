import { ElementRef, Renderer, Input } from "@angular/core";
export abstract class BaseDirective{
    protected element: any;

    @Input() componentId: string;

    constructor(protected renderer: Renderer, protected elementRef: ElementRef) {
        this.element = this.elementRef.nativeElement as Node
    }

}
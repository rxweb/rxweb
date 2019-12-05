import { ElementRef, Renderer,Directive, AfterViewInit, Input, OnDestroy } from "@angular/core";
import { BaseDirective } from "./base.directive";
import { TextDirective } from "@rxweb/framework"

@Directive({
    selector: '[rxText]',
})
export class RxTextDirective extends BaseDirective implements AfterViewInit, OnDestroy {
    @Input('rxText') name: string;

    @Input() text: string;

    constructor(renderer: Renderer, elementRef: ElementRef) {
        super(renderer, elementRef)
        console.log("constructor called");
    }


    private textDirective: TextDirective;

    ngAfterViewInit(): void {
        console.log("called");
        this.textDirective = new TextDirective({ element: this.element, name: this.name, componentId: this.componentId,text:this.text });
        this.textDirective.bind();
    }

    ngOnDestroy(): void {
        this.textDirective.destroy();
    }
}
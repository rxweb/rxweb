import { ElementRef, Renderer,Directive, AfterViewInit, Input, OnDestroy, ViewContainerRef } from "@angular/core";
import { BaseDirective } from "./base.directive";
import { TextDirective } from "@rxweb/localization"

@Directive({
    selector: '[rxText]',
})
export class RxTextDirective extends BaseDirective implements AfterViewInit, OnDestroy {
    @Input('rxText') name: string;

    @Input() text: string;

    constructor(renderer: Renderer, elementRef: ElementRef, viewContainerRef: ViewContainerRef) {
        super(renderer, elementRef, viewContainerRef)
    }


    private textDirective: TextDirective;

    ngAfterViewInit(): void {
        this.textDirective = new TextDirective({ element: this.element, name: this.name, target: this.component,text:this.text });
        this.textDirective.bind();
    }

    ngOnDestroy(): void {
        this.textDirective.destroy();
    }
}
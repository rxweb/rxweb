import { ElementRef, Renderer,Directive, AfterViewInit, Input, OnDestroy, ViewContainerRef } from "@angular/core";
import { BaseDirective } from "./base.directive";
import { PlaceholderDirective } from "@rxweb/localization"

@Directive({
    selector: '[rxPlaceholder]',
})
export class RxPlaceholderDirective extends BaseDirective implements AfterViewInit, OnDestroy {
    @Input('rxPlaceholder') name: string;

    private placeholderDirective: PlaceholderDirective;
    constructor(renderer: Renderer, elementRef: ElementRef,viewContainerRef:ViewContainerRef) {
        super(renderer, elementRef, viewContainerRef)
    }
    ngAfterViewInit(): void {
        this.placeholderDirective = new PlaceholderDirective(this.element, this.name, this.component);
        this.placeholderDirective.bind();
    }

    ngOnDestroy(): void {
        this.placeholderDirective.destroy();
    }
}
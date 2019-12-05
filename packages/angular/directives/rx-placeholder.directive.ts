import { ElementRef, Renderer,Directive, AfterViewInit, Input, OnDestroy } from "@angular/core";
import { BaseDirective } from "./base.directive";
import { PlaceholderDirective } from "@rxweb/framework"

@Directive({
    selector: '[rxPlaceholder]',
})
export class RxPlaceholderDirective extends BaseDirective implements AfterViewInit, OnDestroy {
    @Input('rxPlaceholder') name: string;

    private placeholderDirective: PlaceholderDirective;
    constructor(renderer: Renderer, elementRef: ElementRef) {
        super(renderer, elementRef)
    }
    ngAfterViewInit(): void {
        this.placeholderDirective = new PlaceholderDirective(this.element, this.name, this.componentId);
        this.placeholderDirective.bind();
    }

    ngOnDestroy(): void {
        this.placeholderDirective.destroy();
    }
}
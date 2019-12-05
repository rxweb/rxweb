import { Directive, AfterViewInit, Input, OnDestroy } from "@angular/core";
import { BaseDirective } from "./base.directive";
import { PlaceholderDirective } from "@rxweb/framework"

@Directive({
    selector: 'rxPlaceholder',
})
export class RxPlaceholderDirective extends BaseDirective implements AfterViewInit, OnDestroy {
    @Input('rxPlaceholder') name: string;

    private placeholderDirective: PlaceholderDirective;

    ngAfterViewInit(): void {
        this.placeholderDirective = new PlaceholderDirective(this.element, this.name, this.componentId);
        this.placeholderDirective.bind();
    }

    ngOnDestroy(): void {
        this.placeholderDirective.destroy();
    }
}
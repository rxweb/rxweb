import { Directive, AfterViewInit, ElementRef, Renderer, Input, OnDestroy } from "@angular/core";
import { MultiLingualData } from "@rxweb/core";
import { BaseDirective } from "./base.directive";

@Directive({
    selector: 'rxPlaceholder',
})
export class RxPlaceholderDirective extends BaseDirective implements AfterViewInit, OnDestroy {
    @Input('rxPlaceholder') name: string;
    

    ngAfterViewInit(): void {
        this.bind()
    }

    bind() {
        var value = MultiLingualData.get(`${this.componentId}.${this.name}_p`);
        if (value)
            this.element.placeholder = value;
    }

    ngOnDestroy(): void {
        this.element = undefined;
    }
}
import { Directive, AfterViewInit, ElementRef, Renderer, Input, OnDestroy } from "@angular/core";
import { MultiLingualData } from "@rxweb/core";
import { BaseDirective } from "./base.directive";

@Directive({
    selector: 'rxText',
})
export class RxTextDirective extends BaseDirective implements AfterViewInit, OnDestroy {
    @Input('rxText') name: string;

    private textNodeElement: any;

    ngAfterViewInit(): void {
        this.bind()
    }

    bind() {
        var value = MultiLingualData.get(`${this.componentId}.${this.name}_t`);
        if (value) {
            this.textNodeElement = document.createTextNode(value);
            this.element.appendChild(this.textNodeElement);
        }
    }

    ngOnDestroy(): void {
        if (this.textNodeElement)
            this.element.parentElement.removeChild(this.textNodeElement);
        this.textNodeElement = undefined;
        this.element = undefined;
    }
}
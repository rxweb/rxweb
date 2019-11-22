import { Directive, AfterViewInit, ElementRef, Renderer, Input, OnDestroy } from "@angular/core";
import { BaseDirective } from "./base.directive";

const FOCUS_EVENT: string = "focus";

@Directive({
    selector: 'rxFocus',
})
export class RxFocusDirective extends BaseDirective implements AfterViewInit, OnDestroy {
    @Input('rxFocus') focus: any; 

    ngAfterViewInit(): void {
        if (this.focus && this.focus != "false")
            this.setFocus();
    }

    setFocus(): void {
        var t = setTimeout(() => {
            this.renderer.invokeElementMethod(
                this.element, FOCUS_EVENT, []);
        }, 100);
    }

    ngOnDestroy(): void {
        this.element = undefined;
    }
}
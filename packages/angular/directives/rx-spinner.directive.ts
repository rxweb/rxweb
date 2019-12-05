import { ElementRef, Renderer,Directive, AfterViewInit, Input, OnDestroy } from "@angular/core";
import { BaseDirective } from "./base.directive";
import { instanceResolver, SpinnerDirective } from "@rxweb/framework"

@Directive({
    selector: '[rxSpinner]',
})
export class RxSpinnerDirective extends BaseDirective implements AfterViewInit, OnDestroy {
    private _spinner: boolean;

    @Input('rxSpinner') set spinner(value: boolean) {
        this._spinner = value;
        if (this.spinnerDirective)
            this.bind();
    }
    constructor(renderer: Renderer, elementRef: ElementRef) {
        super(renderer, elementRef)
    }

    get spinner() {
        return this._spinner;
    }

    private spinnerDirective: SpinnerDirective;



    ngAfterViewInit(): void {
        this.spinnerDirective = <SpinnerDirective>instanceResolver("rxSpinner", this.element);
        this.bind();
    }

    bind() {
        this.spinnerDirective.valueChange(this._spinner)
    }

    ngOnDestroy(): void {
        this.spinnerDirective.destroy();
    }
}
import { Directive, AfterViewInit, Input, OnDestroy } from "@angular/core";
import { BaseDirective } from "./base.directive";
import { SpinnerDirective } from "@rxweb/framework"

@Directive({
    selector: 'rxSpinner',
})
export class RxSpinnerDirective extends BaseDirective implements AfterViewInit, OnDestroy {
    private _spinner: boolean;

    @Input('rxSpinner') set spinner(value: boolean) {
        this._spinner = value;
        if (this.spinnerDirective)
            this.bind();
    }

    get spinner() {
        return this._spinner;
    }

    @Input() inClass: string[];

    private spinnerDirective: SpinnerDirective;



    ngAfterViewInit(): void {
        this.spinnerDirective = new SpinnerDirective(this.element, this.inClass);
        this.bind();
    }

    bind() {
        this.spinnerDirective.valueChange(this._spinner)
    }

    ngOnDestroy(): void {
        this.spinnerDirective.destroy();
    }
}
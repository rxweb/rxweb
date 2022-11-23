import { ElementRef, Directive, AfterViewInit, Input, OnDestroy } from "@angular/core";
import { instanceResolver, SpinnerDirective } from "@rxweb/framework"
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

@Directive({
    selector: '[rxSpinner]',
})
export class RxSpinnerDirective implements AfterViewInit, OnDestroy {
    private _spinner: boolean;

    private element: any;

    @Input() componentId: string;

    @Input('rxSpinner') set spinner(value: boolean) {
        this._spinner = value;
        if (this.spinnerDirective)
            this.bind();
    }
    constructor(private elementRef: ElementRef) {
        this.element = this.elementRef.nativeElement as Node
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




@NgModule({
    imports: [CommonModule],
    exports: [RxSpinnerDirective],
    declarations: [RxSpinnerDirective]
})
export class RxSpinnerModule { }

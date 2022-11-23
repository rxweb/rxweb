import { ElementRef, Directive, AfterViewInit, Input, OnDestroy } from "@angular/core";
import { FocusDirective } from "@rxweb/framework"
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";


@Directive({
    selector: '[rxFocus]',
})
export class RxFocusDirective implements AfterViewInit, OnDestroy {
    private _focus: any;

    protected element: any;

    @Input() componentId: string;

    @Input('rxFocus') set focus(value: any) {
        this._focus = value;
        if (this.focusDirective)
            this.focusDirective.bind(this._focus)
    }; 
    constructor(private elementRef: ElementRef) {
        this.element = this.elementRef.nativeElement as Node
    }
    get focus() {
        return this._focus;
    }

    focusDirective: FocusDirective;

    ngAfterViewInit(): void {
        this.focusDirective = new FocusDirective(this.element);
        this.focusDirective.bind(this.focus === "" || this.focus)
    }

    ngOnDestroy(): void {
        this.element = undefined;
    }
}



@NgModule({
    imports: [CommonModule],
    exports: [RxFocusDirective],
    declarations: [RxFocusDirective]
})
export class RxFocusModule { }

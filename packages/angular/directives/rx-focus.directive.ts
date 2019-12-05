import { ElementRef, Renderer,Directive, AfterViewInit, Input, OnDestroy } from "@angular/core";
import { BaseDirective } from "./base.directive";
import { FocusDirective } from "@rxweb/framework"

@Directive({
    selector: '[rxFocus]',
})
export class RxFocusDirective extends BaseDirective implements AfterViewInit, OnDestroy {
    private _focus: any;
    @Input('rxFocus') set focus(value: any) {
        this._focus = value;
        if (this.focusDirective)
            this.focusDirective.bind(this._focus)
    }; 
    constructor(renderer: Renderer, elementRef: ElementRef) {
        super(renderer, elementRef)
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
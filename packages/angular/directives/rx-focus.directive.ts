import { Directive, AfterViewInit, Input, OnDestroy } from "@angular/core";
import { BaseDirective } from "./base.directive";
import { FocusDirective } from "@rxweb/framework"

@Directive({
    selector: 'rxFocus',
})
export class RxFocusDirective extends BaseDirective implements AfterViewInit, OnDestroy {
    private _focus: boolean;
    @Input('rxFocus') set focus(value: boolean) {
        this._focus = value;
            this.focusDirective.bind(this._focus)
    }; 

    get focus() {
        return this._focus;
    }

    focusDirective: FocusDirective;

    ngAfterViewInit(): void {
        this.focusDirective = new FocusDirective(this.element);
        this.focusDirective.bind(this.focus)
    }

    ngOnDestroy(): void {
        this.element = undefined;
    }
}
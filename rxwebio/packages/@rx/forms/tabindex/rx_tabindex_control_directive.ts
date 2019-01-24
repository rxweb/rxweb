import {Directive, AfterViewInit, Renderer, ElementRef, Input, ContentChild,OnDestroy} from "@angular/core";
import {FormControlName, FormGroupDirective} from "@angular/forms"

import {ApplicationConfiguration } from "../../core";
import {TABINDEX} from "../../util/constants/constants";


@Directive({
    selector: '[rxTabindex]'
})
export class RxTabindexDirective implements AfterViewInit {
    private element: Node;
    private currentTabindex: string;
    private currentFormControlName: string;

    constructor(private renderer: Renderer, private elementRef: ElementRef) { this.element = this.elementRef.nativeElement as Node; }

    @Input('rxTabindex') set tabindex(value: string) {
        this.currentTabindex = value;
        this.setElementTabIndex(value);
    }

    @Input('formControlName') set formControlName(value: string) {
        this.currentFormControlName = value;
    }

    ngAfterViewInit(): void {
        if (!this.currentTabindex) {
            var tabindex = ApplicationConfiguration.get(`${TABINDEX}.${this.currentFormControlName}`);
            if (tabindex)
                this.setElementTabIndex(tabindex);
        }
    }

    setTabindex(pageName: string): void {
        
        var tabindex = ApplicationConfiguration.get(`tabindex.jobOrder.${this.currentFormControlName}`);
        if (tabindex)
            this.setElementTabIndex(tabindex);
    }

    private setElementTabIndex(value: string) {
        this.renderer.setElementAttribute(this.element, TABINDEX, value);
    }

}



import {Directive, AfterViewInit, Input, ContentChild, OnDestroy} from "@angular/core";

import {RxTabindexDirective } from "./rx_tabindex_control_directive";
@Directive({
    selector: '[rxControlindex]'
})
export class RxControlIndexDirective implements AfterViewInit, OnDestroy {
    @ContentChild(RxTabindexDirective) tabindexDirectives: RxTabindexDirective[];
    constructor() { }

    @Input('rxControlindex') pageName: string;

    ngAfterViewInit(): void {
        if (!this.tabindexDirectives) {
            this.tabindexDirectives.forEach(t => t.setTabindex(this.pageName));
        }
    }

    ngOnDestroy(): void {
        this.tabindexDirectives = undefined;
    }
}
import {
    ElementRef,
    HostListener, Directive
    } from "@angular/core"
import {CLICK_EVENT,TARGET_ELEMENT } from "../../util/constants/constants";

@Directive({
    selector: '[rxCollapse]'
})
export class RxCollapseDirective {
    ignoreElement: RegExp;
    element: HTMLDivElement;
    constructor(elementRef: ElementRef) {
        this.element = elementRef.nativeElement as HTMLDivElement;
        this.ignoreElement = /^(button|i)$/i;
    };
    @HostListener(CLICK_EVENT, [TARGET_ELEMENT])
    onClick(element: HTMLElement) {
        if (this.isSelect(element.tagName)) {
            if (this.element.classList.contains('collapsed')) {
                this.element.nextElementSibling.classList.add("in");
                this.element.classList.remove('collapsed')
            } else {
                this.element.nextElementSibling.classList.remove("in");
                this.element.classList.add('collapsed')
            }
        }
    }

    private isSelect(tagName: string): boolean {
        return !this.ignoreElement.test(tagName);
    }

    
}
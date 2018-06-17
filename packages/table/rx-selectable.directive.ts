import { Directive, OnDestroy, Input, ElementRef, HostListener } from "@angular/core";

@Directive({
    selector: '[rxSelectable]'
})
export class RxSelectableDirective implements OnDestroy {
    element: HTMLTableRowElement;
    ignoreElement: RegExp;
    @Input('rxSelectable') selectable: any;

    constructor(elementRef: ElementRef) {
        this.element = elementRef.nativeElement as HTMLTableRowElement;
        this.ignoreElement = /^(a|input|textarea|button|i)$/i;
    };

    @HostListener('click', ["$event.target"])
    onClick(element: HTMLElement) {
        if (this.isSelect(element.tagName))
            if (this.selectable.selectable) {
                let gridElement = document.querySelector("".concat('.', this.selectable.code));
                let rowElement = gridElement.querySelectorAll(':scope .row-selected');
                if (rowElement.length > 0)
                    rowElement[0].className = rowElement[0].className.replace('row-selected', '');
                this.element.classList.add('row-selected');
            }
    }

    private isSelect(tagName: string): boolean {
        return !this.ignoreElement.test(tagName);
    }

    ngOnDestroy(): void {
    }
}

import { Directive, OnInit, Input, Renderer, ElementRef } from "@angular/core";

@Directive({
    selector: '[rxHtml]',
})
export class RxHtmlDirective implements OnInit {
    @Input('rxHtml') data: string;
    element: HTMLDivElement;
    constructor(private renderer: Renderer, private elementRef: ElementRef,
    ) {
        this.element = elementRef.nativeElement as HTMLDivElement;
    }
    ngOnInit() {
        if (this.data)
            this.element.insertAdjacentHTML('beforeend', this.data);
    }
}

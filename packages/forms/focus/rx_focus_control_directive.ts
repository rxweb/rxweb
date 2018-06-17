import { Directive, AfterViewInit, ElementRef, Renderer, Input, OnDestroy } from "@angular/core";

import { FOCUS_EVENT } from "../../util/constants/constants";

@Directive({
  selector: '[rxFocus]',
  exportAs: 'focus'
})
export class RxFocusDirective implements AfterViewInit, OnDestroy {
  private element: Node;
  @Input('rxFocus') focus: string = undefined
  constructor(private renderer: Renderer, private elementRef: ElementRef) {
    this.element = this.elementRef.nativeElement as Node
  }

  ngAfterViewInit(): void {
    if (this.focus && this.focus != "false")
      this.setFocus();
  }

  setFocus(): void {    
    var t = setTimeout(() => {
      this.renderer.invokeElementMethod(
        this.element, FOCUS_EVENT, []);
    }, 100);
  }

  ngOnDestroy(): void {
    this.element = undefined;
  }
}

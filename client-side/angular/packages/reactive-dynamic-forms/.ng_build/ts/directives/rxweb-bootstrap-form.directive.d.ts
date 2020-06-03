import { Renderer2, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { ControlConfigProcessor } from '../form-designer/control-config-processor';
export declare class RxDynamicFormDirective extends ControlConfigProcessor implements OnInit, OnDestroy {
    constructor(elementRef: ElementRef, renderer: Renderer2);
    ngOnInit(): void;
    removeChildren(element: any): void;
    ngOnDestroy(): void;
}

import { Renderer2, ElementRef, OnInit, Directive, OnDestroy } from '@angular/core'
import { ControlConfigProcessor } from '../form-designer/control-config-processor';
import { ControlState } from '../statics/control-state';

@Directive({
    selector: '[rxwebDynamicForm]'
})
export class RxDynamicFormDirective extends ControlConfigProcessor implements OnInit, OnDestroy {


    constructor(elementRef: ElementRef, renderer: Renderer2) {
        super(elementRef.nativeElement as Node, renderer);
    }


    ngOnInit() {
        this.build();
    }

    removeChildren(element: any) {
        while (element.firstElementChild)
            this.removeChildren(element.firstElementChild);

        let controlId = element.getAttribute("data-rxwebid");
        if (controlId && ControlState.controls[controlId]) {
            ControlState.controls[controlId].destroy();
            delete ControlState.controls[controlId];
        }
    }

    ngOnDestroy() {
        if (this.element)
            this.removeChildren(this.element);

    }
}
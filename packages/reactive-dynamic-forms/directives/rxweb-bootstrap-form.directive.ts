import { Renderer2, ElementRef, OnInit, Directive,OnDestroy } from '@angular/core'
import { ControlConfigProcessor  } from '../form-designer/control-config-processor';

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

    ngOnDestroy() {
        let count = this.domManipulations.length;
        for (var i = count; i >= 0; i--)
            this.domManipulations[i].destroy();
    }
}
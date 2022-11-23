import { Renderer2, ElementRef, Directive } from '@angular/core';
import { ControlConfigProcessor } from '../form-designer/control-config-processor';
import { ControlState } from '../statics/control-state';
export class RxDynamicFormDirective extends ControlConfigProcessor {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     */
    constructor(elementRef, renderer) {
        super(elementRef.nativeElement, renderer);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.build();
    }
    /**
     * @param {?} element
     * @return {?}
     */
    removeChildren(element) {
        while (element.firstElementChild)
            this.removeChildren(element.firstElementChild);
        let /** @type {?} */ controlId = element.getAttribute("data-rxwebid");
        if (controlId && ControlState.controls[controlId]) {
            ControlState.controls[controlId].destroy();
            delete ControlState.controls[controlId];
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this.element)
            this.removeChildren(this.element);
    }
}
RxDynamicFormDirective.decorators = [
    { type: Directive, args: [{
                selector: '[rxwebDynamicForm]'
            },] },
];
/**
 * @nocollapse
 */
RxDynamicFormDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
];
function RxDynamicFormDirective_tsickle_Closure_declarations() {
    /** @type {?} */
    RxDynamicFormDirective.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    RxDynamicFormDirective.ctorParameters;
}
//# sourceMappingURL=rxweb-bootstrap-form.directive.js.map
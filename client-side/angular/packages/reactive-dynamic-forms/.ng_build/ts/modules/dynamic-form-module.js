import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RxDynamicFormDirective } from '../directives/rxweb-bootstrap-form.directive';
import { RxDynamicFormBuilder } from '../services/dynamic-form-builder';
export class RxReactiveDynamicFormsModule {
    /**
     * @return {?}
     */
    static forRoot() { return { ngModule: RxReactiveDynamicFormsModule, providers: [] }; }
}
RxReactiveDynamicFormsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [RxDynamicFormDirective],
                imports: [CommonModule],
                providers: [RxDynamicFormBuilder],
                exports: [RxDynamicFormDirective]
            },] },
];
/**
 * @nocollapse
 */
RxReactiveDynamicFormsModule.ctorParameters = () => [];
function RxReactiveDynamicFormsModule_tsickle_Closure_declarations() {
    /** @type {?} */
    RxReactiveDynamicFormsModule.decorators;
    /**
     * @nocollapse
     * @type {?}
     */
    RxReactiveDynamicFormsModule.ctorParameters;
}
//# sourceMappingURL=dynamic-form-module.js.map
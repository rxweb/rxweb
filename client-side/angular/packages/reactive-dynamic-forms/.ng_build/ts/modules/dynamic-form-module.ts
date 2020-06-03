import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common"
import { RxDynamicFormDirective } from '../directives/rxweb-bootstrap-form.directive'
import { RxDynamicFormBuilder } from "../services/dynamic-form-builder"
@NgModule({
    declarations: [RxDynamicFormDirective],
    imports: [CommonModule],
    providers: [RxDynamicFormBuilder],
    exports: [RxDynamicFormDirective]
})
export class RxReactiveDynamicFormsModule {
    static forRoot(): ModuleWithProviders { return { ngModule: RxReactiveDynamicFormsModule, providers: [] }; }
}

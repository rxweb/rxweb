import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule, DecimalPipe } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RxFormBuilder } from "./rx-form-builder";
import { RxwebFormDirective } from "../directives/rx-form.directive";
import { DecimalProvider } from "../domain/element-processor/decimal.provider"
import { RxwebDynamicFormComponent,RxwebControlComponent } from '../components'
import { HtmlControlTemplateDirective,ControlHostDirective,NgModelDirective } from '../directives'
@NgModule({
    declarations: [RxwebFormDirective, RxwebDynamicFormComponent,HtmlControlTemplateDirective,RxwebControlComponent,ControlHostDirective,NgModelDirective],
    imports: [CommonModule,FormsModule, ReactiveFormsModule],
    providers: [RxFormBuilder,DecimalProvider, DecimalPipe],
    exports:[RxwebFormDirective,RxwebDynamicFormComponent,HtmlControlTemplateDirective,RxwebControlComponent,ControlHostDirective,NgModelDirective]
})
export class RxReactiveFormsModule {
    static forRoot(): ModuleWithProviders { return { ngModule: RxReactiveFormsModule, providers: [] }; }
}

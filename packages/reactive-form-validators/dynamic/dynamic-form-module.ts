import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RxWebControlComponent ,RxwebDynamicFormComponent} from './component'
import { ControlTemplateDirective, RxDynamicForm, RxwebActionDirective } from './directives'
@NgModule({
    declarations: [RxDynamicForm, RxWebControlComponent, ControlTemplateDirective, RxwebActionDirective, RxwebDynamicFormComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    providers: [],
    exports: [RxDynamicForm, RxWebControlComponent, ControlTemplateDirective, RxwebActionDirective, RxwebDynamicFormComponent]
})
export class RxDynamicReactiveFormsModule {
    static forRoot(): ModuleWithProviders { return { ngModule: RxDynamicReactiveFormsModule, providers: [] }; }
}

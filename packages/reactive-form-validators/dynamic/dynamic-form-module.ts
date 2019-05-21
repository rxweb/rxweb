import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common"
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RxWebControlComponent } from './component'
import { ControlTemplateDirective, RxDynamicForm } from './directives'
@NgModule({
    declarations: [RxDynamicForm, RxWebControlComponent,ControlTemplateDirective],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    providers: [],
    exports: [RxDynamicForm, RxWebControlComponent, ControlTemplateDirective]
})
export class RxDynamicReactiveFormsModule {
    static forRoot(): ModuleWithProviders { return { ngModule: RxDynamicReactiveFormsModule, providers: [] }; }
}

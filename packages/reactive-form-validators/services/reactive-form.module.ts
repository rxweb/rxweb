import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RxFormBuilder } from "./rx-form-builder";


@NgModule({
    declarations: [],
    exports: [],
    imports: [FormsModule, ReactiveFormsModule],
    providers: [RxFormBuilder],
})
export class RxFormsModule {
    static forRoot(): ModuleWithProviders { return { ngModule: RxFormsModule, providers: [] }; }
}

import { CommonModule, DecimalPipe } from "@angular/common";
import { ModuleWithProviders, NgModule } from "@angular/core";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { defaultContainer } from "../core/defaultContainer";
import { ControlHostDirective } from '../directives/control-host.directive';
import { HtmlControlTemplateDirective } from '../directives/html-control-template.directive';
import { RxwebFormDirective } from "../directives/rx-form.directive";
import { AsyncValidationDirective } from "../directives/template-validations/async-validation.directive";
import { FileControlDirective } from "../directives/template-validations/file-control.directive";
import { ImageFileControlDirective } from "../directives/template-validations/image-file-control.directive";
import { RxFormControlDirective } from "../directives/template-validations/rxformcontrol.directive";
import { DecimalProvider } from "../domain/element-processor/decimal.provider";
import { ReactiveFormConfig } from "../util/reactive-form-config";
import { RxFormBuilder } from "./rx-form-builder";
import { TypedFormBuilder } from "./typed-form-builder";
@NgModule({
    declarations: [RxwebFormDirective, HtmlControlTemplateDirective, ControlHostDirective, RxFormControlDirective, FileControlDirective, ImageFileControlDirective, AsyncValidationDirective  ],
    imports: [CommonModule,FormsModule, ReactiveFormsModule],
    providers: [RxFormBuilder,DecimalProvider, DecimalPipe],
    exports: [AsyncValidationDirective,RxwebFormDirective,HtmlControlTemplateDirective,RxFormControlDirective,FileControlDirective ,ImageFileControlDirective ]
})
export class RxReactiveFormsModule {
    static forRoot(): ModuleWithProviders<RxReactiveFormsModule> { return { ngModule: RxReactiveFormsModule, providers: [] }; }
}

// Experimental
@NgModule({
    declarations: [],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RxReactiveFormsModule.forRoot()],
    providers: [{ provide: FormBuilder, useClass: TypedFormBuilder }, TypedFormBuilder],
    exports: [ReactiveFormsModule, FormsModule, ReactiveFormsModule]
})
export class ReactiveTypedFormsModule {
    constructor() {
        defaultContainer.isExperimental = true;
        ReactiveFormConfig.autoInstancePush = true;
    }
    static forRoot(): ModuleWithProviders<ReactiveTypedFormsModule> { return { ngModule: ReactiveTypedFormsModule, providers: [] }; }
}

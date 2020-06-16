import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule, DecimalPipe } from "@angular/common"
import { FormsModule, ReactiveFormsModule, FormBuilder } from "@angular/forms";
import { RxFormBuilder } from "./rx-form-builder";
import { RxwebFormDirective } from "../directives/rx-form.directive";
import { DecimalProvider } from "../domain/element-processor/decimal.provider"
import { HtmlControlTemplateDirective} from '../directives/html-control-template.directive'
import { ControlHostDirective} from '../directives/control-host.directive'
import {RxFormControlDirective  } from "../directives/template-validations/rxformcontrol.directive"
import {FileControlDirective } from "../directives/template-validations/file-control.directive"
import { ImageFileControlDirective } from "../directives/template-validations/image-file-control.directive"
import { AsyncValidationDirective } from "../directives/template-validations/async-validation.directive"
import { defaultContainer } from "../core/defaultContainer";
import { TypedFormBuilder } from "./typed-form-builder";
import { ReactiveFormConfig } from "../util/reactive-form-config"
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

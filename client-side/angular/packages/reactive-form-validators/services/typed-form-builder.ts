import { FormBuilder, FormGroup, AbstractControlOptions } from "@angular/forms";
import { RxFormBuilder } from "./rx-form-builder";
import { FUNCTION_STRING } from "../const/app.const"
import { Options } from "../models/interface/options"
import { RxFormGroup } from "./rx-form-group";
export class TypedFormBuilder {
    private formBuilder: FormBuilder;
    private rxFormBuilder: RxFormBuilder;
    constructor() {
        this.formBuilder = new FormBuilder();
        this.rxFormBuilder = new RxFormBuilder();
    }

    group<T>(controlsConfig: {
        [key: string]: any;
    }, options?: AbstractControlOptions | {
        [key: string]: any;
    } | null): FormGroup | T {
        let paramOptions = <Options>options || <any>{};
        if (typeof controlsConfig == FUNCTION_STRING)
            paramOptions && paramOptions.config && paramOptions.config.isFormGroup ? this.rxFormBuilder.formGroup(controlsConfig, paramOptions.data, paramOptions.config) : (<RxFormGroup>this.rxFormBuilder.formGroup(controlsConfig, paramOptions.data, paramOptions.config)).modelInstance;
        return this.formBuilder.group(controlsConfig,options);
    }
}
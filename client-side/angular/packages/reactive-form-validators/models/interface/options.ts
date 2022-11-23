import { AbstractControlOptions as BaseAbstractControlOptions } from "@angular/forms"
import { FormBuilderConfiguration } from "../form-builder-configuration";
export interface Options extends BaseAbstractControlOptions {
    data: { [key: string]: any }
    config?: FormBuilderConfiguration;
    isInstance?: boolean;
}
import { PropValidationConfig } from "./prop-validation-config";
import {ValidatorFn } from '@angular/forms'

export class FormBuilderConfiguration{
    constructor(formBuilderConfiguration?: FormBuilderConfiguration) {
        if (formBuilderConfiguration)
            for (var column in formBuilderConfiguration)
                this[column] = formBuilderConfiguration[column];
    }

    applyAllProps?:ValidatorFn[];

    excludeProps?: string[];

    dynamicValidation?: { [key: string]: PropValidationConfig }
}

import { PropValidationConfig } from "./prop-validation-config";
import {ValidatorFn } from '@angular/forms'
import { AutoInstanceConfig } from './interface/auto-instance-config.interface'

export class FormBuilderConfiguration{
    constructor(formBuilderConfiguration?: FormBuilderConfiguration) {
        if (formBuilderConfiguration)
            for (var column in formBuilderConfiguration)
                this[column] = formBuilderConfiguration[column];
    }

    genericEntities: { [key: string]: Function };

    applyAllProps?:ValidatorFn[];

    excludeProps?: string[];

    includeProps?: string[];

    dynamicValidation?: { [key: string]: PropValidationConfig }

    dynamicValidationConfigurationPropertyName?:string;

    autoInstanceConfig?:AutoInstanceConfig
}


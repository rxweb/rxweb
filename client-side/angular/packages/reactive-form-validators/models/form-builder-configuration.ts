import { PropValidationConfig } from "./prop-validation-config";
import {ValidatorFn, AbstractControlOptions } from '@angular/forms'
import { AutoInstanceConfig } from './interface/auto-instance-config.interface'
import { PropConfig } from "./config/prop-config"
export class FormBuilderConfiguration{
    constructor(formBuilderConfiguration?: FormBuilderConfiguration) {
        if (formBuilderConfiguration)
            for (var column in formBuilderConfiguration)
                this[column] = formBuilderConfiguration[column];
    }

    genericEntities?: { [key: string]: Function };

    applyAllProps?:ValidatorFn[];

    excludeProps?: string[];

    includeProps?: string[];

    ignoreUndefinedProps?:string[];

    propsConfig?: {[key:string]:PropConfig};

    dynamicValidation?: { [key: string]: PropValidationConfig }

    dynamicValidationConfigurationPropertyName?:string;

    autoInstanceConfig?: AutoInstanceConfig

    abstractControlOptions?: { [key: string]: 'change' | 'blur' | 'submit' }

    baseAbstractControlOptions?: { [key: string]: AbstractControlOptions }
}


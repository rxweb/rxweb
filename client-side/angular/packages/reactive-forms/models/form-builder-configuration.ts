import { PropValidationConfig } from "./prop-validation-config";
import { AutoInstanceConfig } from './interface/auto-instance-config.interface'
import { PropConfig } from "./config/prop-config"
import { ValidatorFn } from "./interface/validator-fn";
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

    stateChange?: Function;

    statePropertyName?: string;
}


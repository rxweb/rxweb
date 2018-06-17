import { PropValidationConfig } from "./prop-validation-config";

export class FormBuilderConfiguration{
    constructor(formBuilderConfiguration?: FormBuilderConfiguration) {
        if (formBuilderConfiguration)
            for (var column in formBuilderConfiguration)
                this[column] = formBuilderConfiguration[column];
    }

    includeArrayProps: string[] | string[][];

    includeObjectdProps: string[] | string[][];

    excludeProps: string[];

    additionalValidations: { [key: string]: PropValidationConfig }
}

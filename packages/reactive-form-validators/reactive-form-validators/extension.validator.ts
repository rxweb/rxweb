import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { ObjectMaker } from "../util/object-maker";
import { ExtensionConfig } from "../models/config/extension-config";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';
export function extensionValidator(config: ExtensionConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
       if (FormProvider.ProcessRule(control,config)) {
            if (RegexValidator.isNotBlank(control.value)) {
                var testResult = config.extensions.filter(t=>{ return control.value.indexOf(t) != -1 })[0] ;
                if (!testResult)
                    return ObjectMaker.toJson(AnnotationTypes.extension, config.message || null, [control.value]);
            }
        } return ObjectMaker.null();
    }
}

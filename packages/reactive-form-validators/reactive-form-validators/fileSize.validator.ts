import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { ObjectMaker } from "../util/object-maker";
import { SizeConfig } from "../models/config/size-config";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';
export function fileSizeValidator(config: SizeConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
       if (FormProvider.ProcessRule(control,config)) {
            if (RegexValidator.isNotBlank(control.value)) {
                if (!(control.value.size <= config.maxSize))
                    return ObjectMaker.toJson(AnnotationTypes.fileSize, config.message || null, [control.value]);
            }
        } return ObjectMaker.null();
    }
}

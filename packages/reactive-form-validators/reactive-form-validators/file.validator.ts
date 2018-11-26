import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { ObjectMaker } from "../util/object-maker";
import { FileConfig } from "../models/config/file-config";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';
export function fileValidator(config: FileConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
       if (FormProvider.ProcessRule(control,config)) {
            if (RegexValidator.isNotBlank(control.value)) {
                let files = control.value as File[];
                let minFiles = config.minFiles ? config.minFiles : 1;
                if (!(files.length > 0 && files[0] instanceof File && files.length >= minFiles && files.length <= config.maxFiles))
                    return ObjectMaker.toJson(AnnotationTypes.file, config.message || null, [control.value]);
            }
        } return ObjectMaker.null();
    }
}

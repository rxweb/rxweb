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
                let files = control.value as File[]
                let minFileSize = config.minSize ? config.minSize : 0;
                let testResult = false;
                for(let file of files){
                    let fileSize = file.size;
                    testResult = (!(fileSize >= minFileSize && fileSize <= config.maxSize));
                    if(testResult)
                      break;
                }
                if (testResult)
                    return ObjectMaker.toJson(AnnotationTypes.fileSize, config.message || null, [control.value]);
            }
        } return ObjectMaker.null();
    }
}

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
                let files = control.value as File[];
                let testResult = true;
                for(let file of files){
                    let splitText = file.name.split(".");
                    let extension:string = splitText[splitText.length - 1];
                    let result = config.extensions.filter(t=>{ return extension.toLowerCase() == t.toLowerCase() })[0] ;
                    if(!result){
                            testResult = false;
                            break;
                    }
                      
                }
                if (!testResult)
                    return ObjectMaker.toJson(AnnotationTypes.extension, config.message || null, [control.value]);
            }
        } return ObjectMaker.null();
    }
}

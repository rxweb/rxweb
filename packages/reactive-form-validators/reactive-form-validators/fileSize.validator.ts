import {
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { ObjectMaker } from "../util/object-maker";
import { SizeConfig } from "../models/config/size-config";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';
export function fileSizeValidator(config: SizeConfig): any {
    return (control: AbstractControl,files:FileList): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
        if(!control["validatorConfig"] || !control["validatorConfig"]["fileSize"])
          ApplicationUtil.configureControl(control,config,AnnotationTypes.fileSize);
       if (files && FormProvider.ProcessRule(control,config)) {
            if (RegexValidator.isNotBlank(control.value)) {
                let minFileSize = config.minSize ? config.minSize : 0;
                let testResult = false;
                let fileSize:number = 0;
                for (var i = 0; i < files.length; i++) {
                    let file = files.item(i);
                    fileSize = file.size;
                    testResult = (!(fileSize >= minFileSize && fileSize <= config.maxSize));
                    if(testResult)
                      break;
                }
                if (testResult)
                    return ObjectMaker.toJson(AnnotationTypes.fileSize, config, [fileSize,config.maxSize]);
            }
        } return ObjectMaker.null();
    }
}

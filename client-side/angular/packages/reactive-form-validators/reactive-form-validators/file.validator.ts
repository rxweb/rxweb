import {
  AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { ObjectMaker } from "../util/object-maker";
import { FileConfig } from "../models/config/file-config";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';
import {getConfigObject} from "../util/config-provider";
import { VALIDATOR_CONFIG } from "../const/app.const";
export function fileValidator(configModel: FileConfig): any {
  return (control: AbstractControl, files: FileList): { [key: string]: any } => {
    let config = getConfigObject(configModel,control);    
    if (!control[VALIDATOR_CONFIG] || !control[VALIDATOR_CONFIG][AnnotationTypes.file])
        ApplicationUtil.configureControl(control, config, AnnotationTypes.file);
    if(files){
      if (FormProvider.ProcessRule(control, config)) {
        if (RegexValidator.isNotBlank(control.value)) {
          let minFiles = config.minFiles ? config.minFiles : 0;
          let maxFiles = config.maxFiles ? config.maxFiles : files.length;
          if (!(files.length > 0 && files[0] instanceof File && files.length >= minFiles && files.length <= maxFiles))
            return ObjectMaker.toJson(AnnotationTypes.file, config, [files.length, minFiles, maxFiles]);
        }
      }
    }
     return ObjectMaker.null();
  }
}

import {
  AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { ObjectMaker } from "../util/object-maker";
import { FileConfig } from "../models/config/file-config";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';
export function fileValidator(config: FileConfig): any {
  return (control: AbstractControl, files: FileList): { [key: string]: any } => {
    config = ApplicationUtil.getConfigObject(config);
    if (!control["validatorConfig"] || !control["validatorConfig"]["file"])
      ApplicationUtil.configureControl(control, config, AnnotationTypes.file);
    if (FormProvider.ProcessRule(control, config)) {
      if (RegexValidator.isNotBlank(control.value)) {
        let minFiles = config.minFiles ? config.minFiles : 1;
        let maxFiles = config.maxFiles ? config.maxFiles : 1;
        if (!(files.length > 0 && files[0] instanceof File && files.length >= minFiles && files.length <= maxFiles))
          return ObjectMaker.toJson(AnnotationTypes.file, config, [files.length, minFiles, maxFiles]);
      }
    } return ObjectMaker.null();
  }
}

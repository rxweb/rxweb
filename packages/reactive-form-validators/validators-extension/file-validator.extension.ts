import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { FileConfig } from "../models/config/file-config";
import { fileValidator } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';
import {ApplicationUtil} from '../util/app-util';
export function fileValidatorExtension(config: FileConfig): ValidatorFn {
    var validator = fileValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.file, config);
        else
          return ApplicationUtil.configureControl(control,config,AnnotationTypes.file),validator(control);
      return null
    }
    return rxwebValidator;
}

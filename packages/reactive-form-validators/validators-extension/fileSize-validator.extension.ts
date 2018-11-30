import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { SizeConfig } from "../models/config/size-config";
import { fileSizeValidator } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';
import {ApplicationUtil} from '../util/app-util';
export function fileSizeValidatorExtension(config: SizeConfig): ValidatorFn {
    var validator = fileSizeValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.fileSize, config);
        else
          return ApplicationUtil.configureControl(control,config,AnnotationTypes.fileSize),validator(control);
      return null
    }
    return rxwebValidator;
}

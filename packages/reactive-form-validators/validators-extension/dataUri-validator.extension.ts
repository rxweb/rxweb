import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { BaseConfig} from "../models/config/base-config";
import { dataUriValidator } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';
import {ApplicationUtil} from '../util/app-util';
export function dataUriValidatorExtension(config?: BaseConfig): ValidatorFn {
    var validator = dataUriValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.dataUri, config);
        else
          return ApplicationUtil.configureControl(control,config,AnnotationTypes.dataUri),validator(control);
      return null
    }
    return rxwebValidator;
}

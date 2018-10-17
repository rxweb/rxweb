import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { HexColorConfig } from "../models/config/hex-color-config";
import { hexColorValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';
import {ApplicationUtil} from '../util/app-util';
export function hexColorValidatorExtension(config?: HexColorConfig): ValidatorFn {
    var validator = hexColorValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.hexColor, config);
        else
          return ApplicationUtil.configureControl(control,config,AnnotationTypes.hexColor),validator(control);
      return null
    }
    return rxwebValidator;
}

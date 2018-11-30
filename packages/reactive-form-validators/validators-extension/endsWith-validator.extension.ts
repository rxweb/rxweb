import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { DefaultConfig} from "../models/config/default-config";
import { endsWithValidator } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';
import {ApplicationUtil} from '../util/app-util';
export function endsWithValidatorExtension(config: DefaultConfig): ValidatorFn {
    var validator = endsWithValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.endsWith, config);
        else
          return ApplicationUtil.configureControl(control,config,AnnotationTypes.endsWith),validator(control);
      return null
    }
    return rxwebValidator;
}

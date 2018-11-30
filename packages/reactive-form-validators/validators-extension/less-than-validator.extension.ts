import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { RelationalOperatorConfig } from "../models/config/relational-operator-config";
import { lessThanValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';
import {ApplicationUtil} from '../util/app-util';
export function lessThanValidatorExtension(config?: RelationalOperatorConfig): ValidatorFn {
    var validator = lessThanValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.lessThan, config);
        else
          return ApplicationUtil.configureControl(control,config,AnnotationTypes.lessThan),validator(control);
      return null
    }
    return rxwebValidator;
}

import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { ChoiceConfig } from "../models/config/choice-config";
import { choiceValidator  } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';
import {ApplicationUtil} from '../util/app-util';
export function choiceValidatorExtension(config?: ChoiceConfig): ValidatorFn {
    var validator = choiceValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.choice, config);
        else
          return ApplicationUtil.configureControl(control,config,AnnotationTypes.choice),validator(control);
      return null
    }
    return rxwebValidator;
}

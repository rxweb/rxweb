import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { ExtensionConfig} from "../models/config/extension-config";
import { extensionValidator } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';

export function extensionValidatorExtension(config: ExtensionConfig): ValidatorFn {
    var validator = extensionValidator(config);
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.extension, config);
        else
          return validator(control);
      return null
    }
    return rxwebValidator;
}

import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { ExtensionConfig} from "../models/config/extension-config";
import { extensionValidator } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';
import {ApplicationUtil} from '../util/app-util';
export function extensionValidatorExtension(config: ExtensionConfig): ValidatorFn {
    var validator = (control) =>{return null};
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.extension, config);
        else
          return ApplicationUtil.configureControl(control,config,AnnotationTypes.extension),validator(control);
      return null
    }
    return rxwebValidator;
}

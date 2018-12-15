import {
    ValidatorFn,AbstractControl
} from "@angular/forms";
import { ImageConfig } from "../models/config/image-config";
import { imageValidator } from '../reactive-form-validators/index'
import { defaultContainer } from "../core/defaultContainer"
import { AnnotationTypes } from "../core/validator.static"
import {STRING } from '../const/validator.const';
import {ApplicationUtil} from '../util/app-util';
export function imageValidatorExtension(config: ImageConfig): ValidatorFn {
    var validator = (control) =>{return null};
    var rxwebValidator = (control:any,target?:object): { [key: string]: any } => {
        if (typeof control == STRING)
          defaultContainer.init(target, 0, control, AnnotationTypes.image, config);
        else
          return ApplicationUtil.configureControl(control,config,AnnotationTypes.image),validator(control);
      return null
    }
    return rxwebValidator;
}

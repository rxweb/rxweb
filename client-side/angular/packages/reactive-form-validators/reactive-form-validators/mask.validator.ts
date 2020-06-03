import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import { MaskConfig } from "../models/config/mask-config";
import { getConfigObject } from "../util/config-provider";
import { VALIDATOR_CONFIG } from "../const/app.const";
import { AnnotationTypes } from "../core/validator.static";
import { ApplicationUtil } from '../util/app-util';

export function maskValidator(configModel: MaskConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let config = getConfigObject(configModel, control);
        if (!control[VALIDATOR_CONFIG] || !control[VALIDATOR_CONFIG][AnnotationTypes.mask])
            ApplicationUtil.configureControl(control, config, AnnotationTypes.mask);
        return null;        
  }
}

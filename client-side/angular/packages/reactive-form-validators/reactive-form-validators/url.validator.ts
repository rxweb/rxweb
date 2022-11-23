import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import { RegExRule } from "../util/regex-rules";
import { DefaultConfig } from "../models/config/default-config";
import { AnnotationTypes } from "../core/validator.static";
import { validate } from "../validators-function/regex-validation.function"
import { UrlConfig } from "../models/config/url-config";
import { getConfigObject } from "../util/config-provider";

function urlValidation(configModel: UrlConfig, control: AbstractControl) {
    var regex = RegExRule.url;
    let config = getConfigObject(configModel, control);
    if (config && config.urlValidationType) {
        switch (config.urlValidationType) {
            case 1:
                regex = RegExRule.url;
                break;
            case 2:
                regex = RegExRule.localhostUrl;
                break;
            case 3:
                regex = RegExRule.interanetUrl;
                break;
        }
    }

    return validate(config, control, regex, AnnotationTypes.url)
}
export function urlValidator(configModel: DefaultConfig): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        return urlValidation(configModel, control)
  }
}

import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { ObjectMaker } from "../util/object-maker";
import { IpConfig } from "../models/config/ip-config";
import { AnnotationTypes } from "../core/validator.static";
import { ValidatorValueChecker } from "../util/validator-value-checker";
import {getConfigObject} from "../util/config-provider";
import { IpVersion } from '../enums'
import { checkIpV4, checkIpV6 } from '../util/ip-checker'
export function ipValidator(config: IpConfig): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    config = getConfigObject(config,control);
    if (ValidatorValueChecker.pass(control, config)) {
      let values: string[] = config.isCidr ? control.value.split('/') : [control.value];
      var isValid = (config.version == IpVersion.V4) ?
        checkIpV4(values[0]) :
        (config.version == IpVersion.V6) ?
          checkIpV6(values[0]) :
          (checkIpV4(values[0]) || checkIpV6(values[0]))
      if (config.isCidr && isValid) {
        isValid = (values.length > 1) ?
          config.version == IpVersion.V4 ?
            RegexValidator.isValid(values[1], RegExRule.cidrV4) :
            config.version == IpVersion.V6 ?
              RegexValidator.isValid(values[1], RegExRule.cidrV6) :
              (RegexValidator.isValid(values[1], RegExRule.cidrV4) || RegexValidator.isValid(values[1], RegExRule.cidrV6)) :
          false;
      }
      if (!isValid)
        return ObjectMaker.toJson(AnnotationTypes.ip, config, [control.value]);
    }
    return ObjectMaker.null();
  }
}

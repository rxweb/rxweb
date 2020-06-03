import {
  ValidatorFn,
  AbstractControl
} from "@angular/forms";
import { RegexValidator } from "../util/regex-validator";
import { PasswordConfig } from "../models/config/password-config";
import {getConfigObject} from "../util/config-provider";
import { ObjectMaker } from "../util/object-maker";
import { AnnotationTypes } from "../core/validator.static";
import { PASSWORD_CONFIG } from "../const/config-names.const";
import { ApplicationUtil } from '../util/app-util'
export function passwordValidator(configModel: PasswordConfig): ValidatorFn {
    function getMessageObject(jObject: { [key: string]: any }, keyName: string) {
        if (!jObject.message && !jObject.messageKey) {
            let message = ObjectMaker.getPasswordMessage();
            jObject.message = message && typeof message == "string" ? message : ApplicationUtil.isObject(message) ? message[keyName] : "";
            if (!jObject.message)
                jObject.message = message["password"];
            jObject.messageKey = "";
        }
        return jObject
    }
  return (control: AbstractControl): { [key: string]: any } => {
      let config = getConfigObject(configModel, control, PASSWORD_CONFIG);
    let controlValue = control.value;
    if (RegexValidator.isNotBlank(controlValue)) {
        let validation = RegexValidator.isValidPassword(config.validation, controlValue);
        let jObject:any = {};
        jObject.message = (config.message && config.message[validation.keyName]) ? config.message[validation.keyName] : typeof config.message =="string" ? config.message : '' ;
        jObject.messageKey = (config.messageKey && config.messageKey[validation.keyName]) ? config.messageKey[validation.keyName] : typeof config.messageKey == "string" ? config.messageKey : "";
        jObject = getMessageObject(jObject, validation.keyName);
      if (!validation.isValid)
        return ObjectMaker.toJson(AnnotationTypes.password, jObject, [controlValue])
    }
    return ObjectMaker.null();

  }
}

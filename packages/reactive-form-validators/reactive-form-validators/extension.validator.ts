import {
  AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { ObjectMaker } from "../util/object-maker";
import { ExtensionConfig } from "../models/config/extension-config";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';
export function extensionValidator(config: ExtensionConfig): any {
  return (control: AbstractControl, files: FileList): { [key: string]: any } => {
    config = ApplicationUtil.getConfigObject(config);
    if (!control["validatorConfig"] || !control["validatorConfig"]["extension"])
      ApplicationUtil.configureControl(control, config, AnnotationTypes.extension);
    if (files && FormProvider.ProcessRule(control, config)) {
      if (RegexValidator.isNotBlank(control.value)) {
        let testResult = true;
        let extension: string = '';
        for (var i = 0; i < files.length; i++) {
          let file = files.item(i);
          let splitText = file.name.split(".");
          extension = splitText[splitText.length - 1];
          let result = config.extensions.filter(t => { return extension.toLowerCase() == t.toLowerCase() })[0];
          if (!result) {
            testResult = false;
            break;
          }

        }
        if (!testResult)
          return ObjectMaker.toJson(AnnotationTypes.extension, config, [extension, config.extensions.join(",")]);
      }
    } return ObjectMaker.null();
  }
}

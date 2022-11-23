import {
  AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { ObjectMaker } from "../util/object-maker";
import { ImageConfig } from "../models/config/image-config";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';
import {getConfigObject} from "../util/config-provider";
import { VALIDATOR_CONFIG } from "../const/app.const";
export function imageValidator(configModel: ImageConfig): any {
  return (control: AbstractControl, files: FileList): { [key: string]: any } => {
    let config = getConfigObject(configModel,control);
    if (!control[VALIDATOR_CONFIG] || !control[VALIDATOR_CONFIG][AnnotationTypes.image])
      ApplicationUtil.configureControl(control, config, AnnotationTypes.image);
    if (!files)
      return ObjectMaker.null();
    return new Promise((resolve, reject) => {
      if (FormProvider.ProcessRule(control, config)) {
        if (RegexValidator.isNotBlank(control.value)) {
          let testResult = false;
          for (var i = 0; i < files.length; i++) {
            let file = files.item(i);
            let type = file.type ? file.type.split('/') : [];
            testResult = type.length > 1 && type[0] == "image";
            if (!testResult)
              break;
            let image = new Image();
            config.minWidth = config.minWidth ? config.minWidth : 0;
            config.minHeight = config.minHeight ? config.minHeight : 0;
            image.onload = () => {
              testResult = (image.width >= config.minWidth && image.height >= config.minHeight) && (image.width <= config.maxWidth && image.height <= config.maxHeight);
              if (!testResult)
                resolve(ObjectMaker.toJson(AnnotationTypes.image, config, [image.width, image.height]));
              else
                resolve(ObjectMaker.null());
            }
            image.onerror = () => {
              resolve(ObjectMaker.toJson(AnnotationTypes.image, config, []));
            }
            image.src = URL.createObjectURL(file)
          }
          if (!testResult)
            resolve(ObjectMaker.toJson(AnnotationTypes.image, config, []));
        }
      } return ObjectMaker.null();
    })
  }
}

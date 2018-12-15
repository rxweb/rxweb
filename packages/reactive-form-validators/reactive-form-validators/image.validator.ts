import {
    AsyncValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { ObjectMaker } from "../util/object-maker";
import { ImageConfig } from "../models/config/image-config";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';
export function imageValidator(config: ImageConfig):  any {
    return (control: AbstractControl,files:FileList): { [key: string]: any } => {
      config = ApplicationUtil.getConfigObject(config);
      if(!control["validatorConfig"] || !control["validatorConfig"]["image"])
          ApplicationUtil.configureControl(control,config,AnnotationTypes.image);
      if(!files)
        return ObjectMaker.null();
      return new Promise((resolve, reject) => {
          if (FormProvider.ProcessRule(control,config)) {
            if (RegexValidator.isNotBlank(control.value)) {
                let minWidth = config.minWidth ? config.minWidth : 0;
                let minHeight = config.maxHeight ? config.maxHeight : 0;
                let testResult = false;
                for (var i = 0; i < files.length; i++) {
                    let file = files.item(i);
                    let type = file.type ? file.type.split('/') : [];
                    testResult = type.length > 1 && type[0] == "image";
                    if(!testResult)
                        break;
                    let image = new Image();
                    config.minWidth = config.minWidth ? config.minWidth : 0;
                    config.minHeight = config.minHeight ? config.minHeight : 0;
                    image.onload = () => {
                      testResult = (image.width >= config.minWidth && image.height >= config.minHeight) && (image.width <= config.maxWidth && image.height <= config.maxHeight);
                      if(!testResult)
                        resolve(ObjectMaker.toJson(AnnotationTypes.image, config.message || null, [image.width,image.height]));
                      else
                        resolve(ObjectMaker.null());
                    }
                    image.onerror = () => {
                        resolve(ObjectMaker.toJson(AnnotationTypes.image, config.message || null, []));
                    }
                    image.src = URL.createObjectURL(file)
                }
                if (!testResult)
                    resolve(ObjectMaker.toJson(AnnotationTypes.image, config.message || null, []));
            }
        } return ObjectMaker.null();
      })
    }
}

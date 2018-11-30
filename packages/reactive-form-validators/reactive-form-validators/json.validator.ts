import {
    ValidatorFn,
    AbstractControl
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { RegExRule } from "../util/regex-rules";
import { DecoratorName } from "../util/decorator-name"
import { ObjectMaker } from "../util/object-maker";
import { DefaultConfig } from "../models/config/default-config";
import { Linq } from "../util/linq";
import { ApplicationUtil } from "../util/app-util";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
export function jsonValidator(config: DefaultConfig): ValidatorFn {
    function process(value){
          var result:boolean = false;
            try {
            var json = JSON.parse(value);
            result = !!json && typeof json === 'object'
            }
            catch(ex){
                result = false;
            }
            return result;
    }

    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
        if (FormProvider.ProcessRule(control,config)) {
            if (RegexValidator.isNotBlank(control.value)) {
              if(process(control.value))
                return ObjectMaker.toJson(AnnotationTypes.json, config.message || null, [control.value]);
            }
        } return ObjectMaker.null();
    }
}

import {
    ValidatorFn,
    AbstractControl,
    FormArray
} from "@angular/forms";

import { RegexValidator } from "../util/regex-validator";
import { ObjectMaker } from "../util/object-maker";
import { UniqueConfig } from "../models/config/unique-config";
import { AnnotationTypes } from "../core/validator.static";
import { FormProvider } from '../util/form-provider';
import { ApplicationUtil } from '../util/app-util';
export function uniqueValidator(config: UniqueConfig): ValidatorFn {
    var setTimeout = (invalidateControls:AbstractControl[],controlValues:any[]) =>{
      let timeOut = window.setTimeout(()=>{
              invalidateControls.forEach(t=>{
              let isMatched = controlValues.filter(x=>x == t.value)[0]
              if(!isMatched)
                  t.updateValueAndValidity();
            })
            window.clearTimeout(timeOut);
            },200)
    }
    var additionalValidation = (config:UniqueConfig,fieldName:string,formGroup:AbstractControl,formArray:FormArray,currentValue:any) =>{
                  let indexOf = formArray.controls.indexOf(formGroup);
                  let formArrayValue = [];
                  if(indexOf != -1){
                    formArray.value.forEach((t,i)=>{
                    if(indexOf != i)
                      formArrayValue.push(t)
                  })
                  return config.additionalValidation(currentValue,indexOf,fieldName,formGroup.value,formArrayValue);
                  }
        return false;
                  
    }
    return (control: AbstractControl): { [key: string]: any } => {
        config = ApplicationUtil.getConfigObject(config);
        if (FormProvider.ProcessRule(control,config)) {
        if (RegexValidator.isNotBlank(control.value)) {
        let formArray = ApplicationUtil.getParentFormArray(control);
        let parentFormGroup = control.parent ? control.parent : undefined;
        let invalidateControls:AbstractControl[] = [];
        let controlValues = [];
        if(formArray && parentFormGroup){
            let currentValue = control.value;
            let fieldName = ApplicationUtil.getFormControlName(control);
            let isMatched = false;
            for(let formGroup of formArray.controls){
                if(formGroup != parentFormGroup){
                  isMatched = (ApplicationUtil.toLower(formGroup.controls[fieldName].value) == ApplicationUtil.toLower(currentValue) && !(formGroup.controls[fieldName].errors && formGroup.controls[fieldName].errors[AnnotationTypes.unique]))
                if(formGroup.controls[fieldName].errors && formGroup.controls[fieldName].errors[AnnotationTypes.unique])
                {
                  var matchedControl = formArray.controls.filter(t=>t.controls[fieldName] != formGroup.controls[fieldName] && ApplicationUtil.toLower(t.controls[fieldName].value) == ApplicationUtil.toLower(formGroup.controls[fieldName].value))[0];
                  if(!matchedControl)
                    invalidateControls.push(formGroup.controls[fieldName])
                }
                else
                  controlValues.push(formGroup.controls[fieldName].value);
              }
                if(isMatched)
                  break;
            }
             if(invalidateControls.length > 0)
                setTimeout(invalidateControls,controlValues);

             let validation = false;
              if(config.additionalValidation){
                  validation = additionalValidation(config,fieldName,parentFormGroup,formArray,currentValue);
              }
             if(isMatched && !validation)
                  return ObjectMaker.toJson(AnnotationTypes.unique, config, [control.value])
           }
        }
      }
         return ObjectMaker.null();
    }
}

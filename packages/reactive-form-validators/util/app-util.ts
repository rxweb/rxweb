import { AbstractControl, FormGroup, FormArray } from "@angular/forms";
import { RxFormArray } from "../services/rx-form-array";
import {NumericValueType } from '../enums'
import { ReactiveFormConfig } from "./reactive-form-config";
const MODEL_INSTANCE_VALUE = "modelInstanceValue";
export class ApplicationUtil{
    static getParentObjectValue(control: AbstractControl) :{ [key:string]:any} {
        if (control.parent) {
            let parent = this.parentObjectValue(control.parent)
            return parent.value;
        }
        return {};
    }

    static getParentModelInstanceValue(control: AbstractControl): { [key: string]: any } {
        if (control.parent) {
            let parent = this.parentObjectValue(control.parent)
            return parent[MODEL_INSTANCE_VALUE];
        }
        return {};
    }

    static getRootFormGroup(control:AbstractControl):FormGroup{
      if (control.parent) {
        return this.getRootFormGroup(control.parent);
      }
      return <FormGroup>control;
    }

    private static getParentControl(control:AbstractControl){
        if (control.parent) {
            let parent = this.parentObjectValue(control.parent)
            return parent;
        }
        return control;
    }

    static getFormControlName(control:AbstractControl){
        let controlName:string = '';
        if(control.parent){
          for(var formControlName in control.parent.controls){
            if(control.parent.controls[formControlName] == control){
              controlName = formControlName;
              break;
            }
          }
        }
      return controlName;
    }

    static getParentFormArray(control:AbstractControl){
        if (control.parent && !(control.parent instanceof FormArray || control.parent instanceof RxFormArray)) {
            let parent = this.getParentFormArray(control.parent)
            return parent;
        }
        return control.parent;
    }

    static toLower(value){
        if(value)
          return String(value).toLowerCase();
        return value;
    }

    static getControl(fieldName:string,formGroup:FormGroup){
      let splitText = fieldName.split('.');
      if(splitText.length > 1){
        var formControl:any = formGroup;
        splitText.forEach((name,index)=>{ formControl = formControl.controls[name]})
        return formControl;
      }else
      return formGroup.controls[fieldName];

    }

    static getFormControl(fieldName:string,control:AbstractControl){
        let splitText = fieldName.split('.');
          if(splitText.length > 1 && control.parent){
          var formControl:any = this.getParentControl(control);
          splitText.forEach((name,index)=>{ formControl = formControl.controls[name]})
          return formControl;
          }
        return (control.parent) ? control.parent.get([fieldName]) : undefined;
    }

    private static parentObjectValue(control: FormGroup | FormArray): FormGroup | FormArray {
        if (!control.parent)
            return control;
        else
            control = this.parentObjectValue(control.parent)
        return control
    }

    

    static isNumeric(value:any){
       return (value - parseFloat(value) + 1) >= 0;
  }

  static notEqualTo(primaryValue: any, secondaryValue: any) {
    let firstValue = (primaryValue === undefined || primaryValue === null) ? "" : primaryValue;
    let secondValue = (secondaryValue === undefined || secondaryValue === null) ? "" : secondaryValue;
    if(firstValue instanceof Date && secondValue instanceof Date)
        return +firstValue != +secondValue;
    return (firstValue != secondValue)
  }

    static numericValidation(allowDecimal:boolean, acceptValue:NumericValueType) {
      let decimalSymbol:string;
      if(ReactiveFormConfig && ReactiveFormConfig.number){
        decimalSymbol = (ReactiveFormConfig.json && ReactiveFormConfig.json.allowDecimalSymbol) ? ReactiveFormConfig.json.allowDecimalSymbol :  ReactiveFormConfig.number.decimalSymbol;
      }else{
        decimalSymbol = ".";
      }
        
        acceptValue = (acceptValue == undefined) ? NumericValueType.PositiveNumber : acceptValue;
        let regex = /^[0-9]+$/;
        switch(acceptValue){
            case NumericValueType.PositiveNumber:
              regex = (!allowDecimal) ? /^[0-9]+$/ : decimalSymbol == "." ? /^[0-9\.]+$/ : /^[0-9\,]+$/;
            break;
            case  NumericValueType.NegativeNumber:
              regex = (!allowDecimal) ? /^[-][0-9]+$/ :  decimalSymbol == "." ?  /^[-][0-9\.]+$/ : /^[-][0-9\,]+$/;
            break;
            case NumericValueType.Both :
              regex = (!allowDecimal) ? /^[-|+]?[0-9]+$/ :   decimalSymbol == "." ?  /^[-|+]?[0-9\.]+$/ : /^[-|+]?[0-9\,]+$/;
            break;
        }
      return regex;
    }

    static configureControl(control:any,config:any,type:string){
          if(!control.validatorConfig){
            let jObject= {};
            jObject[type] = config;
            Object.assign(control,{validatorConfig:jObject})
          } else
            control.validatorConfig[type] = config;
    }

    static lowerCaseWithTrim(value:string) {
        return typeof value === "string" ? value.toLowerCase().trim() : String(value).toLowerCase().trim();
    }
}

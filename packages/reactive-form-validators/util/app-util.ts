import { AbstractControl, FormGroup, FormArray } from "@angular/forms";
import {NumericValueType } from '../enums'
export class ApplicationUtil{
    static getParentObjectValue(control: AbstractControl) :{ [key:string]:any} {
        if (control.parent) {
            let parent = this.parentObjectValue(control.parent)
            return parent.value;
        }
        return {};
    }

    private static parentObjectValue(control: FormGroup | FormArray): FormGroup | FormArray {
        if (!control.parent)
            return control;
        else
            control = this.parentObjectValue(control.parent)
        return control
    }

    static getConfigObject(config: any): any {
        return (config != undefined && config != true) ? config : {};
    }

    static isNumeric(value:any){
       return (value - parseFloat(value) + 1) >= 0;
  }

  static notEqualTo(primaryValue: any, secondaryValue: any) {
    let firstValue = (primaryValue == undefined || primaryValue == null) ? "" : primaryValue;
    let secondValue = (secondaryValue == undefined || secondaryValue == null) ? "" : secondaryValue;
    return (firstValue != secondValue)
  }

    static numericValidation(allowDecimal:boolean, acceptValue:NumericValueType) {
        acceptValue = (acceptValue == undefined) ? NumericValueType.PositiveNumber : acceptValue;
        let regex = /^[0-9]+$/;
        switch(acceptValue){
            case NumericValueType.PositiveNumber:
              regex = (!allowDecimal) ? /^[0-9]+$/ : /^[0-9\.]+$/;
            break;
            case  NumericValueType.NegativeNumber:
              regex = (!allowDecimal) ? /^[-][0-9]+$/ : /^[-][0-9\.]+$/;
            break;
            case NumericValueType.Both :
              regex = (!allowDecimal) ? /^[-|+]?[0-9]+$/ : /^[-|+]?[0-9\.]+$/;
            break;
        }
      return regex;
    }

    static configureControl(control:any,config:any,type:string){
      if(config)
                Object.assign(control,{config:config,type:type})
    }
  

}

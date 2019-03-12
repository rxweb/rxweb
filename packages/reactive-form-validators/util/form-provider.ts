import {Linq } from './linq';
import { ApplicationUtil } from './app-util';
import {
    AbstractControl
} from "@angular/forms";

import { RxFormGroup } from "../services/rx-form-group"

export class FormProvider{

   

    static ProcessRule(control:AbstractControl,config:any,isDynamicConfig:boolean = false) : boolean | {[key:string]:any} {
        const controlValue = control.value;
        const formGroupValue = ApplicationUtil.getParentObjectValue(control);
        const parentObject = (control.parent) ? control.parent.value : undefined;
        let modelInstance = undefined;
        if (control.parent && control.parent instanceof RxFormGroup)
            modelInstance = (<RxFormGroup>control.parent).modelInstance;
        if (parentObject)
            this.updateFormControlValue(parentObject, control.parent.controls, control);
        else if (config.conditionalExpression)
            return false;
        return Linq.execute(formGroupValue, isDynamicConfig ? config.dynamicConfig : config.conditionalExpression, parentObject,modelInstance); 
    }

    private static updateFormControlValue(parentObject:{[key:string]:any},controls:any,control:AbstractControl){
        for(var controlName in parentObject){
            if(!(parentObject[controlName] instanceof Object))
                if(controls[controlName] === control){
                    parentObject[controlName]= control.value;
                    break;
                }
        }
    }
}

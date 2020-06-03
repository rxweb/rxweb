import {Linq } from './linq';
import { ApplicationUtil } from './app-util';


import { RxFormGroup } from "../services/rx-form-group"
import { AbstractControl } from '../abstract/abstract-control';

export class FormProvider{

   

    static ProcessRule(control:AbstractControl,config:any,isDynamicConfig:boolean = false) : boolean | {[key:string]:any} {
        const formGroupValue = ApplicationUtil.getParentObjectValue(control);
        const parentObject = (control.parent) ? ApplicationUtil.cloneValue(control.parent.value) : undefined;
        let modelInstance = undefined;
        if (control.parent && control.parent instanceof RxFormGroup)
            modelInstance = (<RxFormGroup>control.parent).modelInstance;
        if (parentObject)
            this.updateFormControlValue(parentObject, control.parent.controls, control);
        else if (config.conditionalExpression)
            return false;
        return Linq.execute(formGroupValue, config, parentObject,modelInstance,isDynamicConfig); 
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

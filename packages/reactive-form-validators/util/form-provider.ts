import {Linq } from './linq';
import { ApplicationUtil } from './app-util';
import {
    AbstractControl
} from "@angular/forms";


export class FormProvider{

    static ProcessRule(control:AbstractControl,config:any) : boolean {
        const controlValue = control.value;
        const formGroupValue = ApplicationUtil.getParentObjectValue(control);
        const parentObject = (control.parent) ? control.parent.value : undefined;
        return Linq.IsPassed(formGroupValue, config.conditionalExpression, parentObject); 
    }
}

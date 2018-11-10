import {FormControl,ValidatorFn ,AsyncValidatorFn} from "@angular/forms";
import { ObjectMaker } from "../util/object-maker";
import  {MESSAGE,CONTROLS_ERROR,VALUE_CHANGED_SYNC } from '../const'
export class RxFormControl extends FormControl {
    private keyName:string;
    errorMessage:string;
    constructor(formState: any, validator: ValidatorFn | ValidatorFn[] | null, asyncValidator: AsyncValidatorFn | AsyncValidatorFn[] | null, private entityObject:{[key:string]:any}, private baseObject:{[key:string]:any}, controlName:string){
        super(formState, validator, asyncValidator)
        this.keyName = controlName;
    }

    setValue(value:any, options?: {
        dirty?:boolean;
        updateChanged?:boolean;
        onlySelf?: boolean;
        emitEvent?: boolean;
    }):void {
      if(options && options.dirty)
        this.baseObject[this.keyName] = value;
      this.entityObject[this.keyName] = value;
      super.setValue(value,options);
      if(this.errors) {
        Object.keys(this.errors).forEach(t=>{
            this.parent[CONTROLS_ERROR][this.keyName] = this.errorMessage = this.getErrorMessage(this.errors,t);
            if(!this.errorMessage){
              let errorObject = ObjectMaker.toJson(t,undefined,[this.errors[t][t]]);
              this.parent[CONTROLS_ERROR][this.keyName] = this.errorMessage = this.getErrorMessage(errorObject,t) ;
            }
        })
      } else{
            this.errorMessage = undefined;
            this.parent[CONTROLS_ERROR][this.keyName] = undefined
            delete this.parent[CONTROLS_ERROR][this.keyName];
      }
      
      if(!options.updateChanged && this.root[VALUE_CHANGED_SYNC]  ){
        this.root[VALUE_CHANGED_SYNC]();
      }
    }

    private getErrorMessage(errorObject:{[key:string]:string},keyName:string){
      if(errorObject[keyName][MESSAGE])
        return errorObject[keyName][MESSAGE];
      return;
    }
}

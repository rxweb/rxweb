import {FormControl,ValidatorFn ,AsyncValidatorFn} from "@angular/forms";
import { ObjectMaker } from "../util/object-maker";
import  {MESSAGE,CONTROLS_ERROR,VALUE_CHANGED_SYNC } from '../const'
export class RxFormControl extends FormControl {
    private keyName: string;
    private _errorMessage: string;
    private _errorMessages: string[] = [];

    get errorMessages(): string[] {
        if (this._errorMessages.length == 0 && this.errors)
            this.setControlErrorMessages();
        return this._errorMessages;
    }

    get errorMessage(): string {
        if (this._errorMessage == undefined && this.errors) {
            this.setControlErrorMessages();
        }
        return this._errorMessage;
    }
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
        this.setControlErrorMessages();
      
      if(options && !options.updateChanged && this.root[VALUE_CHANGED_SYNC]  ){
        this.root[VALUE_CHANGED_SYNC]();
      }
    }

    private setControlErrorMessages() {
        this._errorMessages = [];
        if (this.errors) {
            Object.keys(this.errors).forEach(t => {
                this.parent[CONTROLS_ERROR][this.keyName] = this._errorMessage = this.getErrorMessage(this.errors, t);
                if (!this._errorMessage) {
                    let errorObject = ObjectMaker.toJson(t, undefined, [this.errors[t][t]]);
                    this.parent[CONTROLS_ERROR][this.keyName] = this._errorMessage = this.getErrorMessage(errorObject, t);
                }
                this._errorMessages.push(this._errorMessage);
            })
        } else {
            this._errorMessage = undefined;
            this.parent[CONTROLS_ERROR][this.keyName] = undefined
            delete this.parent[CONTROLS_ERROR][this.keyName];
        }
    }

    private getErrorMessage(errorObject:{[key:string]:string},keyName:string){
      if(errorObject[keyName][MESSAGE])
        return errorObject[keyName][MESSAGE];
      return;
    }
}

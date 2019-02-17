import {FormGroup, AbstractControl,FormControl, ValidatorFn, AsyncValidatorFn } from "@angular/forms";
import { ObjectMaker } from "../util/object-maker";
import { MESSAGE, CONTROLS_ERROR, VALUE_CHANGED_SYNC } from '../const'
import { ApplicationUtil } from '../util/app-util'
import { DisableProvider } from '../domain/disable-provider';
import { RXCODE } from "../const/app.const"
import { DECORATORS } from "../const/decorators.const";
import { defaultContainer } from "../core/defaultContainer";
export class RxFormControl extends FormControl {
    private keyName: string;
    private _errorMessage: string;
    private _errorMessages: string[] = [];
    private _disableProvider: DisableProvider;
    private _columns: string[];
    private _childColumns: any = [];
    private _parentColumns: { [key: string]: string[] };
    private _refDisableControls= [];
    private _refMessageControls= [];
    private _messageExpression:Function;
    private _isPassedExpression:Boolean = false;

    get errorMessages(): string[] {
        if(!this._messageExpression)
            if (this._errorMessages.length == 0 && this.errors)
                this.setControlErrorMessages();
        else
            if(this._messageExpression && !this._isPassedExpression)
                return [];
        return this._errorMessages;
    }

    get errorMessage(): string {
        if(!this._messageExpression)
            if (this._errorMessage == undefined && this.errors) {
                this.setControlErrorMessages();
            }
        else
        if(this._messageExpression && !this._isPassedExpression)
                return undefined;
        return this._errorMessage;
    }
    constructor(formState: any, validator: ValidatorFn | ValidatorFn[] | null, asyncValidator: AsyncValidatorFn | AsyncValidatorFn[] | null, private entityObject: { [key: string]: any }, private baseObject: { [key: string]: any }, controlName: string) {
        super(formState, validator, asyncValidator)
        this.keyName = controlName;
    }

    setValue(value: any, options?: {
        dirty?: boolean;
        updateChanged?: boolean;
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void {
        if (options && options.dirty)
            this.baseObject[this.keyName] = value;
        this.entityObject[this.keyName] = value;
        super.setValue(value, options);
        this.bindError();
        this.executeExpressions();
        if (options && !options.updateChanged && this.root[VALUE_CHANGED_SYNC]) {
            this.root[VALUE_CHANGED_SYNC]();
        }
    }

    bindError(){
        if(this._messageExpression)
            this._isPassedExpression = this.executeExpression(this._messageExpression,this);
        this.setControlErrorMessages();
    }


    refresh() {
        this._messageExpression = this.getMessageExpression(<FormGroup>this.parent,this.keyName);
        this.bindConditionalControls(DECORATORS.disabled,"_refDisableControls");
        this.bindConditionalControls(DECORATORS.error,"_refMessageControls");
        this.executeExpressions()
    }

    private executeExpressions(){
        this.processExpression("_refDisableControls","disabled");
        this.processExpression("_refMessageControls","bindError");
    }

    private getMessageExpression(formGroup:FormGroup,keyName:string):Function{
            if(formGroup["modelInstance"]){
                let instanceContainer = defaultContainer.get(formGroup["modelInstance"].constructor);
                if(instanceContainer)
                    return instanceContainer.nonValidationDecorators.error.conditionalExpressions[keyName]
                }
                return undefined;
    }

    private bindConditionalControls(decoratorType:string,refName:string){
        this._disableProvider = new DisableProvider(decoratorType);
        this[refName] = this._disableProvider.zeroArgumentProcess(this,this.keyName)
        this._disableProvider.oneArgumentProcess(this,`${this.keyName}${RXCODE}1`).forEach(t=>this[refName].push(t))
        
    }

    private setControlErrorMessages() {
        
        if(!this._messageExpression || this._isPassedExpression){
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
        }else
        {
            this._errorMessages = [];
            this._errorMessage = undefined;
        }
        
    }

    private getErrorMessage(errorObject: { [key: string]: string }, keyName: string) {
        if (errorObject[keyName][MESSAGE])
            return errorObject[keyName][MESSAGE];
        return;
    }

    

    private processExpression(propName:string,operationType:string){
        if(this[propName])
        for(var controlInfo of this[propName]){
            let control = controlInfo.isRoot ?ApplicationUtil.getControl(controlInfo.controlPath,ApplicationUtil.getRootFormGroup(this)) : ApplicationUtil.getFormControl(controlInfo.controlPath,this);
            if(control) {
                if( operationType == "disabled"){
                    let result = this.executeExpression(controlInfo.conditionalExpression,control);
                    if (result)
                        control.disable() 
                    else
                     control.enable();
                }else
                    control.bindError();
                
            }
        }
    }

    private executeExpression(expression:Function,control:AbstractControl):Boolean{
        return expression.call(control.parent["modelInstance"], control, ApplicationUtil.getParentModelInstanceValue(this), control.parent["modelInstance"])
    }

}

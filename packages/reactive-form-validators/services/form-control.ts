import {FormGroup, AbstractControl,FormControl, ValidatorFn, AsyncValidatorFn } from "@angular/forms";
import { ObjectMaker } from "../util/object-maker";
import { MESSAGE, CONTROLS_ERROR, VALUE_CHANGED_SYNC } from '../const'
import { ApplicationUtil } from '../util/app-util'
import { DisableProvider } from '../domain/disable-provider';
import { RXCODE } from "../const/app.const"
import { DECORATORS } from "../const/decorators.const";
import { defaultContainer } from "../core/defaultContainer";
import { SANITIZERS } from "../util/sanitizers"
import { DataSanitizer } from '../core/validator.interface'

const DIRTY:string = "dirty";
const TOUCHED:string = "touched";
const UNTOUCHED:string = "untouched";
const PRISTINE:string = "pristine";
const PENDING:string = "pending";

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
    private _isPassedExpression: Boolean = false;
    private _controlProp:{[key:string]:boolean};
    get errorMessages(): string[] {
        if (!this._messageExpression) {
            if (this._errorMessages.length == 0 && this.errors)
                this.setControlErrorMessages();
        }
        else if(this._messageExpression && !this._isPassedExpression)
            return [];
        if (!this.errors && this._errorMessages.length > 0)
            this.setControlErrorMessages();
        return this._errorMessages;
    }

    get errorMessage(): string {
        if (!this._messageExpression) {
            if (this._errorMessage == undefined && this.errors)
                this.setControlErrorMessages();
        }
        else if(this._messageExpression && !this._isPassedExpression)
            return undefined;
        if (!this.errors && this._errorMessage)
            this.setControlErrorMessages();
        return this._errorMessage;
    }
    constructor(formState: any, validator: ValidatorFn | ValidatorFn[] | null, asyncValidator: AsyncValidatorFn | AsyncValidatorFn[] | null, private entityObject: { [key: string]: any }, private baseObject: { [key: string]: any }, controlName: string,private _sanitizers:DataSanitizer[]) {
        super(formState, validator, asyncValidator)
        this.keyName = controlName;
    }

    setValue(value: any, options?: {
        dirty?: boolean;
        updateChanged?: boolean;
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void {
        let parsedValue = this.getSanitizedValue(value)
        if (options && options.dirty)
            this.baseObject[this.keyName] = value;
        this.entityObject[this.keyName] = parsedValue;
        super.setValue(value, options);
        this.bindError();
        this.executeExpressions();
        if (options && !options.updateChanged && this.root[VALUE_CHANGED_SYNC]) {
            this.root[VALUE_CHANGED_SYNC]();
        }
    }

    getControlValue(){
       return this.getSanitizedValue(this.value); 
    }

    bindError(){
        if(this._messageExpression)
            this._isPassedExpression = this.executeExpression(this._messageExpression,this);
        this.setControlErrorMessages();
    }


    markAsTouched(opts?: {
        onlySelf?: boolean;
    }): void{
        let currentState = this.touched;
        super.markAsTouched(opts);
        if(currentState != this.touched)
            this.runControlPropChangeExpression([TOUCHED,UNTOUCHED])
        
    }

    markAsUntouched(opts?: {
        onlySelf?: boolean;
    }): void{
        let currentState = this.untouched;
        super.markAsUntouched(opts);
        if(currentState != this.untouched)
            this.runControlPropChangeExpression([UNTOUCHED,TOUCHED])
    }

    markAsDirty(opts?: {
        onlySelf?: boolean;
    }): void{
        let currentState = this.dirty;
        super.markAsDirty(opts);
        if(currentState != this.dirty)
            this.runControlPropChangeExpression([DIRTY])
    }

    markAsPristine(opts?: {
        onlySelf?: boolean;
    }): void{
        let currentState = this.pristine;
        super.markAsDirty(opts);
        if(currentState != this.pristine)
            this.runControlPropChangeExpression([PRISTINE])
    }

    markAsPending(opts?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void{
        let currentState = this.pending;
        super.markAsDirty(opts);
        if(currentState != this.pending)
            this.runControlPropChangeExpression([PENDING])
    }

    runControlPropChangeExpression(propNames:string[]){
        propNames.forEach(name=>{
        if(this._controlProp && this._messageExpression && this._controlProp[name])
            this.bindError();
        });
    }

    refresh() {
        this.getMessageExpression(<FormGroup>this.parent,this.keyName);
        this.bindConditionalControls(DECORATORS.disabled,"_refDisableControls");
        this.bindConditionalControls(DECORATORS.error,"_refMessageControls");
        this.executeExpressions();
        this.bindError();
    }

    private executeExpressions(){
        this.processExpression("_refDisableControls","disabled");
        this.processExpression("_refMessageControls","bindError");
    }

    private getMessageExpression(formGroup:FormGroup,keyName:string):void{
            if(formGroup["modelInstance"]){
                let instanceContainer = defaultContainer.get(formGroup["modelInstance"].constructor);
                if(instanceContainer) {
                    this._messageExpression = instanceContainer.nonValidationDecorators.error.conditionalExpressions[keyName]
                    this._controlProp = instanceContainer.nonValidationDecorators.error.controlProp[this.keyName];
                }
                    
                }
    }

    private getSanitizedValue(value:any) {
        if (this._sanitizers) {
            for (let sanitizer of this._sanitizers) {
                value = SANITIZERS[sanitizer.name](value,sanitizer.config);
            }
        }
        return value;
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

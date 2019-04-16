import {FormGroup, AbstractControl,FormControl, ValidatorFn, AsyncValidatorFn } from "@angular/forms";
import { ObjectMaker } from "../util/object-maker";
import { MESSAGE, CONTROLS_ERROR, VALUE_CHANGED_SYNC } from '../const'
import { ApplicationUtil } from '../util/app-util'
import { DisableProvider } from '../domain/disable-provider';
import { RXCODE, MODEL_INSTANCE } from "../const/app.const"
import { DECORATORS } from "../const/decorators.const";
import { defaultContainer } from "../core/defaultContainer";
import { SANITIZERS } from "../util/sanitizers"
import { DataSanitizer } from '../core/validator.interface'
import { ErrorMessageBindingStrategy } from "../enums";
import { ReactiveFormConfig } from "../util/reactive-form-config";

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
    private _refMessageControls = [];
    private _refClassNameControls = [];
    private _errorMessageBindingStrategy: ErrorMessageBindingStrategy;
    private _messageExpression: Function;
    private _classNameExpression: Function;
    private _isPassedExpression: Boolean = false;
    private _controlProp: { [key: string]: boolean };
    private _classNameControlProp: { [key: string]: boolean };

    updateOnElementClass: boolean | Function;

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
        this._errorMessageBindingStrategy = ReactiveFormConfig.get("reactiveForm.errorMessageBindingStrategy") as ErrorMessageBindingStrategy;
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
        this.bindClassName();
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

    bindClassName() {
        if (this.updateOnElementClass && typeof this.updateOnElementClass === "function") {
            let className = this.executeExpression(this._classNameExpression, this);
            let updateElement = this.updateOnElementClass as Function;
            updateElement(className);
        }
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
        propNames.forEach(name => {
            if ((this._controlProp && this._messageExpression && this._controlProp[name]) || (!this._messageExpression && this.checkErrorMessageStrategy()))
                this.bindError();
        if (this._classNameControlProp && this._classNameControlProp[name])
            this.bindClassName();
        });
    }

    refresh() {
        this.getMessageExpression(<FormGroup>this.parent,this.keyName);
        this.bindConditionalControls(DECORATORS.disabled,"_refDisableControls");
        this.bindConditionalControls(DECORATORS.error, "_refMessageControls");
        this.bindConditionalControls(DECORATORS.elementClass, "_refClassNameControls");
        this.executeExpressions();
        this.bindError();
    }

    private checkErrorMessageStrategy() {
        let isBind: boolean = true;
        switch (this._errorMessageBindingStrategy) {
            case ErrorMessageBindingStrategy.OnSubmit:
                isBind = (<any>this.parent).submitted;
                break;
            case ErrorMessageBindingStrategy.OnDirty:
                isBind = this.dirty;
                break;
            case ErrorMessageBindingStrategy.OnTouched:
                isBind = this.touched;
                break;
            case ErrorMessageBindingStrategy.OnDirtyOrTouched:
                isBind = this.dirty || this.touched;
                break;
            default:
                isBind = true;
        }
        return isBind;
    }

    private executeExpressions(){
        this.processExpression("_refDisableControls","disabled");
        this.processExpression("_refMessageControls", "bindError");
        this.processExpression("_refClassNameControls", "bindClassName");
    }

    private getMessageExpression(formGroup:FormGroup,keyName:string):void{
            if(formGroup[MODEL_INSTANCE]){
                let instanceContainer = defaultContainer.get(formGroup[MODEL_INSTANCE].constructor);
                if(instanceContainer) {
                    this._messageExpression = instanceContainer.nonValidationDecorators.error.conditionalExpressions[keyName]
                    this._controlProp = instanceContainer.nonValidationDecorators.error.controlProp[this.keyName];
                    this._classNameExpression = instanceContainer.nonValidationDecorators.elementClass.conditionalExpressions[keyName];
                    this._classNameControlProp = instanceContainer.nonValidationDecorators.elementClass.controlProp[keyName];
                    if (this._classNameExpression)
                        this.updateOnElementClass = true;
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
        this._disableProvider = new DisableProvider(decoratorType,this.entityObject);
        this[refName] = this._disableProvider.zeroArgumentProcess(this,this.keyName)
        this._disableProvider.oneArgumentProcess(this,`${this.keyName}${RXCODE}1`).forEach(t=>this[refName].push(t))
        
    }

    private setControlErrorMessages() {
        if ((!this._messageExpression && this.checkErrorMessageStrategy()) || this._isPassedExpression) {
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

    

    private processExpression(propName: string, operationType: string) {
        if(this[propName])
        for(var controlInfo of this[propName]){
            let control = controlInfo.isRoot ?ApplicationUtil.getControl(controlInfo.controlPath,ApplicationUtil.getRootFormGroup(this)) : ApplicationUtil.getFormControl(controlInfo.controlPath,this);
            if(control) {
                if (operationType == "disabled") {
                    let result = this.executeExpression(controlInfo.conditionalExpression, control);
                    if (result)
                        control.disable()
                    else
                        control.enable();
                } else if (operationType == "bindError")
                    control.bindError();
                else if (operationType == "bindClassName")
                    control.bindClassName();
                
            }
        }
    }

    private executeExpression(expression:Function,control:AbstractControl):Boolean{
        return expression.call(control.parent[MODEL_INSTANCE], control, ApplicationUtil.getParentModelInstanceValue(this), control.parent[MODEL_INSTANCE])
    }

}

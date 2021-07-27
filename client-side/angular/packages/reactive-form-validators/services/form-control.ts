import { FormGroup, AbstractControl, FormControl, ValidatorFn, AsyncValidatorFn, AbstractControlOptions } from "@angular/forms";
import { ObjectMaker } from "../util/object-maker";
import { MESSAGE, CONTROLS_ERROR, VALUE_CHANGED_SYNC } from '../const'
import { ApplicationUtil } from '../util/app-util'
import { DisableProvider } from '../domain/disable-provider';
import { RXCODE, MODEL_INSTANCE, PATCH } from "../const/app.const"
import { DECORATORS } from "../const/decorators.const";
import { defaultContainer } from "../core/defaultContainer";
import { SANITIZERS } from "../util/sanitizers"
import { DataSanitizer } from '../core/validator.interface'
import { ErrorMessageBindingStrategy } from "../enums";
import { ReactiveFormConfig } from "../util/reactive-form-config";

const DIRTY: string = "dirty";
const TOUCHED: string = "touched";
const UNTOUCHED: string = "untouched";
const PRISTINE: string = "pristine";
const PENDING: string = "pending";

export class RxFormControl extends FormControl {
    private _language: string;
    private keyName: string;
    private _errorMessage: string;
    private _errorMessages: string[] = [];
    private _disableProvider: DisableProvider;
    private _columns: string[];
    private _childColumns: any = [];
    private _parentColumns: { [key: string]: string[] };
    private _refDisableControls = [];
    private _refMessageControls = [];
    private _refClassNameControls = [];
    private _errorMessageBindingStrategy: ErrorMessageBindingStrategy;
    private _messageExpression: Function;
    private _classNameExpression: Function;
    private _isPassedExpression: Boolean = false;
    private _controlProp: { [key: string]: boolean };
    private _classNameControlProp: { [key: string]: boolean };
    private _baseValue: any;
    private _isModified: boolean;
    private _errors: any;
    private _dirty: boolean = false;
    private _validators: ValidatorFn[] ;
    private _asyncValidators: AsyncValidatorFn[] ;


    backEndErrors: { [key: string]: string } = {};
    updateOnElementClass: boolean | Function;
    preHook: Function;
    postHook: Function;


    get errorMessages(): string[] {
        if (!this._messageExpression) {
            if (this._errorMessages.length == 0 && this.errors)
                this.setControlErrorMessages();
        }
        else if (this._messageExpression && !this._isPassedExpression)
            return [];
        if (!this.errors && this._errorMessages.length > 0)
            this.setControlErrorMessages();
        if (this._language != this.getLanguage())
            this.setControlErrorMessages();
        return this._errorMessages;
    }

    get errorMessage(): string {
        if (!this._messageExpression) {
            if (this._errorMessage == undefined && this.errors)
                this.setControlErrorMessages();
        }
        else if (this._messageExpression && !this._isPassedExpression)
            return undefined;
        if (!this.errors && this._errorMessage)
            this.setControlErrorMessages();
        if (this._language != this.getLanguage())
            this.setControlErrorMessages();
        return this._errorMessage;
    }
    constructor(formState: any, validator: ValidatorFn | AbstractControlOptions | ValidatorFn[] | null, asyncValidator: AsyncValidatorFn | AsyncValidatorFn[] | null, private entityObject: { [key: string]: any }, private baseObject: { [key: string]: any }, controlName: string, private _sanitizers: DataSanitizer[]) {
        super(formState, validator, asyncValidator)
        this.defineErrorsProperty();
        this._baseValue = formState === undefined ? null : this.getFormState(formState);
        this._isModified = false;
        this.keyName = controlName;
        this._validators = (validator as AbstractControlOptions).validators as ValidatorFn[];
        this._asyncValidators = (validator as AbstractControlOptions).asyncValidators as AsyncValidatorFn[];
        this._errorMessageBindingStrategy = ReactiveFormConfig.get("reactiveForm.errorMessageBindingStrategy") as ErrorMessageBindingStrategy;
        if (this._sanitizers) {
            var floatSanitizer = this._sanitizers.filter(t => t.name == "toFloat")[0]
            if (floatSanitizer && this._baseValue && ReactiveFormConfig.number && ReactiveFormConfig.number.decimalSymbol == ",") {
                let baseValue = String(this._baseValue);
                if (baseValue.indexOf('.') != -1) {
                    this._baseValue = baseValue.replace(".", ReactiveFormConfig.number.decimalSymbol);
                    super.setValue(this._baseValue);
                }

            }
        }
    }

    private defineErrorsProperty() {
        Object.defineProperty(this,"errors", {
            configurable: true,
            get() {
                if (this._language && this._language != this.getLanguage() && this.validator) {
                    this["errors"] = this.validator(this)
                }
                return this._errors;},
            set(value) { this._errors = value; },
        })
    }

    private getFormState(value) {
        let baseValue = value
        if (Array.isArray(value)) {
            baseValue = [];
            value.forEach(t => baseValue.push(t));
        }
        return baseValue;
    }

    get isModified() {
        return this._isModified;
    }

    getValidators(): ValidatorFn[] {
        return this.getValidatorSource(this._validators);
    }

    getAsyncValidators(): AsyncValidatorFn[] {
        return this.getValidatorSource(this._asyncValidators);        
    }

    private getValidatorSource(validators:any[]) {
        if (validators)
            return Array.isArray(validators) ? [...validators] : [validators]
        return [];
    }

    setValidators(newValidator: ValidatorFn | ValidatorFn[] | null) {
        this._validators = newValidator as ValidatorFn[];
        super.setValidators(newValidator);
    }

    setAsyncValidators(newValidator: AsyncValidatorFn | AsyncValidatorFn[] | null): void {
        this._asyncValidators = newValidator as AsyncValidatorFn[];
        super.setAsyncValidators(newValidator);
    }

    setValue(value: any, options?: {
        dirty?: boolean;
        updateChanged?: boolean;
        onlySelf?: boolean;
        emitEvent?: boolean;
        isThroughDynamic?: boolean;
    }): void {
        (<any>this.parent).changing = true;
        let parsedValue = this.getSanitizedValue(value)
        if (options && options.dirty)
            this.baseObject[this.keyName] = value;
        this.entityObject[this.keyName] = parsedValue;
        super.setValue(value, options);

        this.bindError();
        this.bindClassName();
        this.executeExpressions();
        this.callPatch();
        if (options && !options.updateChanged && this.root[VALUE_CHANGED_SYNC]) {
            this.root[VALUE_CHANGED_SYNC]();
        }
        (<any>this.parent).changing = false;
    }

    getControlValue() {
        return this.getSanitizedValue(this.value);
    }

    bindError() {
        if (this._messageExpression)
            this._isPassedExpression = this.executeExpression(this._messageExpression, this);
        this.setControlErrorMessages();
        var t: any = this;
        t["errors"] = this.errors;
    }

    bindClassName() {
        if (this.updateOnElementClass && typeof this.updateOnElementClass === "function") {
            let className = this.executeExpression(this._classNameExpression, this);
            let updateElement = this.updateOnElementClass as Function;
            updateElement(className);
        }
    }


    setBackEndErrors(error: { [key: string]: string }) {
        Object.keys(error).forEach(key => this.backEndErrors[key] = error[key]);
        this.setControlErrorMessages();
    }

    clearBackEndErrors(errors?: { [key: string]: any }) {
        if (!errors)
            this.backEndErrors = {};
        else
            Object.keys(errors).forEach(t => delete this.backEndErrors[t]);
        this.setControlErrorMessages();
    }

    markAsTouched(opts?: {
        onlySelf?: boolean;
    }): void {
        let currentState = this.touched;
        super.markAsTouched(opts);
        if (currentState != this.touched)
            this.runControlPropChangeExpression([TOUCHED, UNTOUCHED])

    }

    markAsUntouched(opts?: {
        onlySelf?: boolean;
    }): void {
        let currentState = this.untouched;
        super.markAsUntouched(opts);
        if (currentState != this.untouched)
            this.runControlPropChangeExpression([UNTOUCHED, TOUCHED])
    }

    markAsDirty(opts?: {
        onlySelf?: boolean;
    }): void {
        let currentState = this._dirty;
        super.markAsDirty(opts);
        this._dirty = true;
        if (currentState != this._dirty)
            this.runControlPropChangeExpression([DIRTY])
    }

    markAsPristine(opts?: {
        onlySelf?: boolean;
    }): void {
        let currentState = this.pristine;
        super.markAsPristine(opts);
        if (currentState != this.pristine)
            this.runControlPropChangeExpression([PRISTINE])
    }

    markAsPending(opts?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
    }): void {
        let currentState = this.pending;
        super.markAsDirty(opts);
        if (currentState != this.pending)
            this.runControlPropChangeExpression([PENDING])
    }

    runControlPropChangeExpression(propNames: string[]) {
        propNames.forEach(name => {
            if ((this._controlProp && this._messageExpression && this._controlProp[name]) || (!this._messageExpression && this.checkErrorMessageStrategy()))
                this.bindError();
            if (this._classNameControlProp && this._classNameControlProp[name])
                this.bindClassName();
        });
    }

    refresh() {
        this.getMessageExpression(<FormGroup>this.parent, this.keyName);
        this.bindConditionalControls(DECORATORS.disabled, "_refDisableControls");
        this.bindConditionalControls(DECORATORS.error, "_refMessageControls");
        this.bindConditionalControls(DECORATORS.elementClass, "_refClassNameControls");
        this.executeExpressions();
        this.bindError();
    }

    reset(value?: any) {
        if (value !== undefined)
            this.setValue(value);
        else
            this.setValue(this.getFormState(this._baseValue));
        this._dirty = false;
    }

    commit() {
        this._baseValue = this.value;
        this.callPatch();
    }

    private callPatch() {
        this._isModified = this.getValue(this._baseValue) != this.getValue(this.value);
        if (this.parent && this.parent[PATCH])
            this.parent[PATCH](this.keyName);
    }

    private checkErrorMessageStrategy() {
        let isBind: boolean = true;
        switch (this._errorMessageBindingStrategy) {
            case ErrorMessageBindingStrategy.OnSubmit:
                isBind = (<any>this.parent).submitted;
                break;
            case ErrorMessageBindingStrategy.OnDirty:
                isBind = this._dirty;
                break;
            case ErrorMessageBindingStrategy.OnTouched:
                isBind = this.touched;
                break;
            case ErrorMessageBindingStrategy.OnDirtyOrTouched:
                isBind = this._dirty || this.touched;
                break;
            case ErrorMessageBindingStrategy.OnDirtyOrSubmit:
                isBind = this._dirty || (<any>this.parent).submitted;
                break;
            case ErrorMessageBindingStrategy.OnTouchedOrSubmit:
                isBind = this.touched || (<any>this.parent).submitted;
                break;
            default:
                isBind = true;
        }
        return isBind;
    }

    private executeExpressions() {
        this.processExpression("_refDisableControls", "disabled");
        this.processExpression("_refMessageControls", "bindError");
        this.processExpression("_refClassNameControls", "bindClassName");
    }

    private getMessageExpression(formGroup: FormGroup, keyName: string): void {
        if (formGroup[MODEL_INSTANCE]) {
            let instanceContainer = defaultContainer.get(formGroup[MODEL_INSTANCE].constructor);
            if (instanceContainer) {
                this._messageExpression = instanceContainer.nonValidationDecorators.error.conditionalExpressions[keyName]
                this._controlProp = instanceContainer.nonValidationDecorators.error.controlProp[this.keyName];
                this._classNameExpression = instanceContainer.nonValidationDecorators.elementClass.conditionalExpressions[keyName];
                this._classNameControlProp = instanceContainer.nonValidationDecorators.elementClass.controlProp[keyName];
                if (this._classNameExpression)
                    this.updateOnElementClass = true;
            }

        }
    }

    private getSanitizedValue(value: any) {
        if (this._sanitizers) {
            for (let sanitizer of this._sanitizers) {
                value = SANITIZERS[sanitizer.name](value, sanitizer.config);
            }
        }
        return value;
    }

    private bindConditionalControls(decoratorType: string, refName: string) {
        this._disableProvider = new DisableProvider(decoratorType, this.entityObject);
        this[refName] = this._disableProvider.zeroArgumentProcess(this, this.keyName)
        this._disableProvider.oneArgumentProcess(this, `${this.keyName}${RXCODE}1`).forEach(t => this[refName].push(t))

    }

    private setControlErrorMessages() {
        if ((!this._messageExpression && this.checkErrorMessageStrategy()) || this._isPassedExpression) {
            this._errorMessages = [];
            if (this.errors) {
                Object.keys(this.errors).forEach(t => {
                    if (this.parent) {
                        this.parent[CONTROLS_ERROR][this.keyName] = this._errorMessage = this.getErrorMessage(this.errors, t);
                        if (!this._errorMessage) {
                            let errorObject = ObjectMaker.toJson(t, undefined, [this.errors[t][t]]);
                            this.parent[CONTROLS_ERROR][this.keyName] = this._errorMessage = this.getErrorMessage(errorObject, t);
                        }
                    } else
                        this._errorMessage = this.getErrorMessage(this.errors, t)
                    this._errorMessages.push(this._errorMessage);
                })
            } else {
                this._errorMessage = undefined;
                if (this.parent) {
                    this.parent[CONTROLS_ERROR][this.keyName] = undefined
                    delete this.parent[CONTROLS_ERROR][this.keyName];
                }
            }
            let backEndErrors = Object.keys(this.backEndErrors);
            if (backEndErrors.length > 0)
                backEndErrors.forEach(t => { this._errorMessages.push(this._errorMessage = this.backEndErrors[t]); })
        } else {
            this._errorMessages = [];
            this._errorMessage = undefined;
        }
        this._language = this.getLanguage();
        
    }

    private getLanguage() {
        return (ReactiveFormConfig.i18n && ReactiveFormConfig.i18n.language) ? ReactiveFormConfig.i18n.language : undefined;
    }

    private getErrorMessage(errorObject: { [key: string]: string }, keyName: string) {
        if (errorObject[keyName][MESSAGE])
            return errorObject[keyName][MESSAGE];
        return;
    }



    private processExpression(propName: string, operationType: string) {
        if (this[propName])
            for (var controlInfo of this[propName]) {
                let control = controlInfo.isRoot ? ApplicationUtil.getControl(controlInfo.controlPath, ApplicationUtil.getRootFormGroup(this)) : ApplicationUtil.getFormControl(controlInfo.controlPath, this);
                if (control) {
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

    private executeExpression(expression: Function, control: AbstractControl): Boolean {
        return expression.call(control.parent[MODEL_INSTANCE], control, ApplicationUtil.getParentModelInstanceValue(this), control.parent[MODEL_INSTANCE])
    }

    private getValue(value: any) {
        return value !== undefined && value !== null && value !== "" ? value : "";
    }

}

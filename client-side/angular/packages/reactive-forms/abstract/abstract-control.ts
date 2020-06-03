import { VALID, PENDING, INVALID, DISABLED } from "../const";

export abstract class AbstractControl {
    constructor(value:any,private validators?: any[], private asyncValidators?: any[]) {
        this._pristine = true;        
        this._value = value;
    }

    get errors() {
        return this._errors;
    }

    set errors(value: any) {
        this._errors = value;
        this.onChange();
    }

    get root() {
        return this._root;
    }

    set root(value: any) {
        this._root = value;
    }

    get value() {
        return this._value;
    }

    set value(value: any) {
        this._value = value;
        this.markAsDirty()
        this.updateValueAndValidity();
    }


    get pristine() {
        return this._pristine;
    }

    get parent() {
        return this._parent
    }

    set parent(value: any) {
        this._parent = value;
    }

    get valid() {
        return this.status === VALID;
    }

    get invalid() {
        return this.status === INVALID;
    }

    get enabled() {
        return this.status !== DISABLED;
    }

    get disabled() {
        return this.status === DISABLED;
    }

    get dirty() {
        return !this.pristine;
    }

    get touched() {
        return this._touched;
    }

    get untouched() {
        return !this._touched;
    }

    get status(): string {
        return this._status;
    }

    set status(value: string) {
        this._status = value;
    }

    markAsDirty() {
        this._pristine = false;
        if (this.parent)
            this.parent.markAsDirty();
    }

    markAsTouched() {
        this._touched = true;
        if (this.parent)
            this.parent.markAsTouched();
    }

    markAsUnTouched() {
        this._touched = false;
        if (this.parent)
            this.parent.markAsUnTouched();
    }

    disable() {
        this.status = DISABLED;
    }

    enable() {
        this.status = VALID;
    }



    updateValueAndValidity() {
        if (this.enabled) {
            this.runValidators()
        }
    }

    private runValidators() {
        this._errors = {};
        if (this.validators) {
            this.validators.forEach(validator => {
                let result = validator(this);
                if (result)
                    this.setErrors(result);
            })
        }
        if (Object.keys(this._errors).length == 0) {
            this.status = VALID;
            this.errors = undefined;
        }
    }

    setErrors(errors: any) {
        Object.keys(errors).forEach(t => this._errors[t] = errors[t])
        this.status = INVALID;
    }

    setValue(value: any) {
        this.value = value;
    }

    onChange() {
        this.subscribers.forEach(t => {
            t();
        })
    }

    subscribe(func: Function) {
        this.subscribers.push(func);
    }

    destroy() {
        while (this.subscribers.length != 0)
            this.subscribers.splice(0, 1);
    }

    private _status: any;
    private _parent: any;
    private _pristine: boolean;
    private _errors: any = {};
    private _value: any;
    private _root: any;
    private _touched: boolean;

    private subscribers: Function[] = new Array<Function>();
}
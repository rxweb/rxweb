import { ValidatorFn, AsyncValidatorFn } from "@angular/forms"
export interface ActionFnConfig {
    label?: () => string;
    filter?: () => any[] | Promise<any[]>;
    placeholder?: () => string;
    hide?: () => boolean;
    description?: () => string;
    disable?: () => boolean;
}


export interface Hooks {
    preValue?: (value: any) => boolean;
    postValue?: () => void;
}
export interface ActionConfig {
    keyName: string;
    actions?: ActionFnConfig;
    hooks?: Hooks;
    validator?: ValidatorFn;
    asyncValidator?: AsyncValidatorFn;
}

import { AbstractControl, ValidatorFn, AsyncValidatorFn} from "@angular/forms"

export abstract class IAbstractControl extends AbstractControl {
    errorMessages: string[];

    errorMessage: string;
 
    bindError: () => void;

    refresh: () => void;

    setBackEndErrors: (errors: { [key: string]: any }) => void;

    clearBackEndErrors: (errors?: { [key: string]: any }) => void;

    getValidators: () => ValidatorFn[]; 

    getAsyncValidators: () => AsyncValidatorFn[];
    }
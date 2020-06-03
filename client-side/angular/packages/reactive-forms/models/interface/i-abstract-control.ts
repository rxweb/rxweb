import { AbstractControl } from "../../abstract/abstract-control";

export abstract class IAbstractControl extends AbstractControl {
    errorMessages: string[];

    errorMessage: string;
 
    bindError: () => void;

    refresh: () => void;

    subscribe: (func: Function) => void;

    path: string;

}
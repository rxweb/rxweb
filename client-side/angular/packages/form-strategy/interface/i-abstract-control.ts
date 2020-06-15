import { AbstractControl } from "@angular/forms"

export abstract class IAbstractControl extends AbstractControl {
    errorMessages: string[];

    errorMessage: string;

}
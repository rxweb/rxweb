import { FormGroup,AbstractControl } from "@angular/forms"
export interface ActionConfig {
    keyName: string;
    actions: {
        label?: (config: { [key: string]: any }, control: AbstractControl, formGroup: FormGroup) => string,
        filter?: (config: { [key: string]: any }, source: any[], control: AbstractControl, formGroup: FormGroup) => any[],
        placeholder?: (config: { [key: string]: any }, control: AbstractControl, formGroup: FormGroup) => string,
        hide?: (config: { [key: string]: any }, control: AbstractControl, formGroup: FormGroup) => boolean,
        description?: (config: { [key: string]: any }, control: AbstractControl, formGroup: FormGroup) => string,
        disable?: (config: { [key: string]: any }, control: AbstractControl, formGroup: FormGroup) => boolean
    }
}

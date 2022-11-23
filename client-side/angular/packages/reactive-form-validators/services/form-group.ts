import { FormGroup } from "@angular/forms";

export interface FormGroupExtension extends FormGroup {
    isDirty: () => boolean;
    resetForm: () => void;
    getErrorSummary: (onlyMessage: boolean) => { [key: string]: any };
    toFormData: () => FormData;

}

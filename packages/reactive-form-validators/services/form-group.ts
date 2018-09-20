import { FormGroup } from "@angular/forms";

export class RxFormGroup extends FormGroup {
    isDirty: () => boolean;
    resetForm: () => void;
}

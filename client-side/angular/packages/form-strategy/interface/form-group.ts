import { FormGroup as BaseFormGroup } from "@angular/forms"
import { FormControlStrategy } from "../model/form-control-strategy";
export interface FormGroup extends BaseFormGroup {
    setStrategy:(strategy: { [key: string]: FormControlStrategy })=> FormGroup;
}
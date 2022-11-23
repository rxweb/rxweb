import { FormControl as BaseFormControl } from "@angular/forms"
import { FormControlStrategy } from "../model/form-control-strategy";
export interface FormControl extends BaseFormControl {
    setStrategy: (name:string,strategy: FormControlStrategy) => void;
    runStrategy: (isSelf?: boolean) => void;
    strategy?: FormControlStrategy;
}


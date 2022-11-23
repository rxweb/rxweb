import { FormControl as BaseFormControl } from "@angular/forms"
import { FormControlStrategy } from '../../model/form-control-strategy'
import { FormGroup } from "../../interface/form-group"
import { FormControl } from '../../interface/form-control'
export function setControlWiseStrategy(strategy: { [key: string]: FormControlStrategy }): FormGroup {
    let _this = <FormGroup>this;
    Object.keys(_this.controls).forEach(key => {
        if (_this.controls[key] instanceof BaseFormControl) {
            if (strategy[key])
                (<FormControl>_this.controls[key]).setStrategy(key,strategy[key])
            else
                (<FormControl>_this.controls[key]).setStrategy(key,new FormControlStrategy({conditional:{}}))
        }
        
    })
    return this;
}
import { FormErrorMessageModuleConfig } from '../interface/form-error-message-module-config'
import { ErrorMessageBindingStrategy } from '../enums'
import { FormControl } from '../interface/form-control';
import { AppFormGroup } from '../interface/i-form-group';

export function checkErrorMessageStrategy(formControl:FormControl,config: FormErrorMessageModuleConfig) {
    let isBind: boolean = true;
    let parentFormGroup = <AppFormGroup<any>>formControl.parent;
    let controlBindingStrategy = formControl.strategy && formControl.strategy.conditional.bindingStrategy ? formControl.strategy.conditional.bindingStrategy  : config.messageBindingStrategy;
    switch (controlBindingStrategy) {
        case ErrorMessageBindingStrategy.OnSubmit:
            isBind = parentFormGroup.submitted;
            break;
        case ErrorMessageBindingStrategy.OnDirty:
            isBind = formControl.dirty;
            break;
        case ErrorMessageBindingStrategy.OnTouched:
            isBind = formControl.touched;
            break;
        case ErrorMessageBindingStrategy.OnDirtyOrTouched:
            isBind = formControl.dirty || formControl.touched;
            break;
        case ErrorMessageBindingStrategy.OnDirtyOrSubmit:
            isBind = formControl.dirty || parentFormGroup.submitted;
            break;
        case ErrorMessageBindingStrategy.OnTouchedOrSubmit:
            isBind = formControl.touched || parentFormGroup.submitted;
            break;
        default:
            isBind = true;
    }
    return isBind;
}
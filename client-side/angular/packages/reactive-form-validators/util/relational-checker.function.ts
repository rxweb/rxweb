import { AbstractControl } from "@angular/forms";
import { ApplicationUtil } from "./app-util";
import { FormProvider } from "./form-provider";
import { RegexValidator } from "./regex-validator";
import { AnnotationTypes } from "../core/validator.static";
import { ObjectMaker } from "./object-maker";
import { getConfigObject } from "../util/config-provider";
const operatorOpposite: { [key: string]: string } = {
    [AnnotationTypes.greaterThan]: AnnotationTypes.lessThan,
    [AnnotationTypes.lessThan]: AnnotationTypes.greaterThan,
    [AnnotationTypes.greaterThanEqualTo]: AnnotationTypes.lessThanEqualTo,
    [AnnotationTypes.lessThanEqualTo]: AnnotationTypes.greaterThanEqualTo,
}
export function relationalCheck(control: AbstractControl, config: any, relationalOperatorName: string) {
    config = getConfigObject(config, control);
    const matchControl = config.fieldName ? ApplicationUtil.getFormControl(config.fieldName, control) : undefined;
    const matchControlValue = (matchControl) ? matchControl.value : config.value !== undefined ? config.value : '';
    if (FormProvider.ProcessRule(control, config)) {
        if (config.isArrayControl)
            return arrayControlValidation(control, config, relationalOperatorName)
        if (isValid(control, matchControlValue, relationalOperatorName) === false)
            return ObjectMaker.toJson(relationalOperatorName, config, [control.value, matchControlValue]);
    }
    return ObjectMaker.null();
}

function isValid(control, matchControlValue, relationalOperatorName) {
    if (RegexValidator.isNotBlank(control.value) && RegexValidator.isNotBlank(matchControlValue)) {
        let isValid = false;
        switch (relationalOperatorName) {
            case AnnotationTypes.greaterThan:
                isValid = parseFloat(control.value) > parseFloat(matchControlValue);
                break;
            case AnnotationTypes.lessThan:
                isValid = parseFloat(control.value) < parseFloat(matchControlValue)
                break;
            case AnnotationTypes.greaterThanEqualTo:
                isValid = parseFloat(control.value) >= parseFloat(matchControlValue)
                break;
            case AnnotationTypes.lessThanEqualTo:
                isValid = parseFloat(control.value) <= parseFloat(matchControlValue)
                break;
        }
        return isValid;
    }
    return null;
}
function setTimeFunc(invalidateControls: AbstractControl[]) {
    let timeOut = setTimeout(() => {
        invalidateControls.forEach(t => {
            t.updateValueAndValidity();
        })
        clearTimeout(timeOut);
    }, 200)
}
function arrayControlValidation(control, config, relationalOperatorName) {
    let formArray = ApplicationUtil.getParentFormArray(control);
    let parentFormGroup = control.parent ? control.parent : undefined;
    let oppositeOperator = operatorOpposite[relationalOperatorName];
    let updateValidityControls = [];
    if (formArray && parentFormGroup && formArray.controls.length > 1) {
        let indexOf = formArray.controls.indexOf(parentFormGroup);
        let fieldName = ApplicationUtil.getFormControlName(control);
        let valid = true;
        if (indexOf > 0)
            valid = validateControl(formArray, control, indexOf - 1, fieldName, oppositeOperator, relationalOperatorName, updateValidityControls)

        if (valid && formArray.controls.length > indexOf + 1) 
            valid = validateControl(formArray, control, indexOf + 1, fieldName, relationalOperatorName, relationalOperatorName, updateValidityControls);

        if (updateValidityControls.length > 0)
            setTimeFunc(updateValidityControls);
        if (valid === false)
            return ObjectMaker.toJson(relationalOperatorName, config, [control.value])
    }
    return ObjectMaker.null();
}

function validateControl(formArray, control, indexOf, fieldName, oppositeOperator, relationalOperatorName, updateValidityControls) {
    let valid = false;
    let formGroup = formArray.controls[indexOf];
    if (formGroup && formGroup.controls) {
        let formControl = formGroup.controls[fieldName];
        valid = isValid(control, formControl.value, oppositeOperator);
        if (valid && formControl.errors && formControl.errors[relationalOperatorName])
            updateValidityControls.push(formControl);
    }
    return valid;
}
import { ResetFormType } from "../enums/reset-type";
import { AbstractControl } from "../abstract/abstract-control";
import { AbstractFormArray } from "../abstract/abstract-form-array";
import { RxFormGroup } from "../services/rx-form-group";

export function isResetControl(controlName:string,control: any, options?: {
    resetType?: ResetFormType,
    with?: string[],
    value?: { [key: string]: any }
}) {
    let isReset: boolean = true;
    if (options) {
        isReset = false;
        if (options.resetType)
        switch (options.resetType) {
            case ResetFormType.ControlsOnly:
                isReset = control instanceof AbstractControl;
                break;
            case ResetFormType.ControlsAndFormGroupsOnly:
                isReset = control instanceof AbstractControl;
                break;
            case ResetFormType.FormGroupsOnly:
                isReset = control instanceof RxFormGroup;
                break;
            case ResetFormType.FormArraysOnly:
                isReset = control instanceof AbstractFormArray;
                break;
            case ResetFormType.DefinedPropsOnly:
                isReset = options.value ? Object.keys(options.value).indexOf(controlName) != -1 : false;
                break;
            default:
                isReset = true;
                break;
            }
        if (!isReset && options.with) 
            isReset = options.with.filter(x => x.split('.')[0] == controlName.split('.')[0])[0] !== undefined;
        if (!isReset && options.value && (options.resetType === undefined || options.resetType !== ResetFormType.DefinedPropsOnly))
            isReset = true;
    }
    return isReset;
}

export function getNestedOptions(controlName: string, options?: {
    resetType?: ResetFormType,
    with?: string[],
    value?: { [key: string]: any }
}) {
    if (options) {
        let jObjectOptions: {
            resetType?: ResetFormType,
            with?: string[],
            value?: { [key: string]: any }
        } | undefined = {};
        if (options.resetType)
            jObjectOptions.resetType = (options.resetType == ResetFormType.FormGroupsOnly || options.resetType == ResetFormType.FormArraysOnly) ? ResetFormType.ControlsOnly : options.resetType;
        if (options.with) {
            let nestedControls = options.with.filter(t => t.split('.')[0] == controlName);
            let controlNames = nestedControls.map(x => {
                let splitControls = x.split('.');
                splitControls.splice(0, 1);
                return splitControls.join('.');
            });
            jObjectOptions.with = controlNames;
        }
        if (options.value && options.value[controlName])
            jObjectOptions.value = options.value[controlName];
        jObjectOptions = Object.keys(jObjectOptions).length > 0 ? jObjectOptions : undefined;
        return jObjectOptions;
    }
    return undefined;
}
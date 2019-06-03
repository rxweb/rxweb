export interface BootstrapCssClassProp {
    defaultControl: string;
    description: string;
    fileControl: string;
    readOnlyPlainText: string;
    rangeControl: string;
    checkBoxAndRadioControl: string;
    checkBoxAndRadioControlRootElement: string;
    checkboxAndRadioControlLabel: string;
    checkboxAndRadioControlInline: string;
    horizontalViewLabel: string;
    formRow: string;
    controlValid:string;
    controlInvalid:string;
    validMessage:string;
    invalidMessage:string;
}

export interface BootstrapConfig {
    cssClasses: BootstrapCssClassProp;
    showValidMarkOnControl: boolean;
}

export interface UiFramework {
    bootstrap: BootstrapConfig;
}

export interface DynamicFormUiConfig {
    uiFramework: UiFramework;
    showingErrorMessage: boolean;
}


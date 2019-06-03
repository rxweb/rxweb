import { BootstrapConfig,DynamicFormUiConfig } from '../dynamic/models/interface/bootstrap-config';

export class ReactiveFormConfig {
    static number:{[key:string]:any} = {}
    static json: { [key: string]: any } = {};
    static dynamicForm: DynamicFormUiConfig = {
        showingErrorMessage: true,
        uiFramework: {
            bootstrap: {
                showValidMarkOnControl: false,
                cssClasses: {
                    defaultControl: 'form-control',
                    description: 'form-text',
                    fileControl: 'form-control-file',
                    readOnlyPlainText: 'form-control-plaintext',
                    rangeControl: 'form-control-range',
                    checkBoxAndRadioControl: 'form-check-input',
                    checkBoxAndRadioControlRootElement: 'form-check',
                    checkboxAndRadioControlLabel: 'form-check-label',
                    checkboxAndRadioControlInline: 'form-check-inline',
                    horizontalViewLabel: 'col-form-label',
                    formRow: 'form-row',
                    controlValid:'is-valid',
                    controlInvalid:'is-invalid',
                    validMessage:'valid-feedback',
                    invalidMessage:'invalid-feedback'
                }
            }
        }
    }

    static activeUiFramework: any;

    private static setActiveUiFramework(name: string) {
        if (this.dynamicForm && this.dynamicForm.uiFramework)
            this.activeUiFramework = this.dynamicForm.uiFramework[name];
    }

    

    static set(jObject: { [key: string]: any }): void {
        if (jObject)
            ReactiveFormConfig.json = jObject;
        if (jObject && jObject.dynamicForm && jObject.dynamicForm.uiFramework)
            this.setActiveUiFramework(jObject.dynamicForm.uiFramework);
    }

    static get(path: string) : any {
        let jObject: { [key: string]: any };        
        if (ReactiveFormConfig.json) {
            let splitPath = path.split('.');
            for (let columnName of splitPath) {
                jObject = (!jObject) ? ReactiveFormConfig.json[columnName] : jObject[columnName];
                if (!jObject)
                    break;
            }
        }
        return jObject;
    }
}

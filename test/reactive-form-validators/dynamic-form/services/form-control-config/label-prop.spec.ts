import { fakeAsync} from '@angular/core/testing';
import { BindingComponent } from "./components/binding.component"
import { ReactiveFormConfig, FormControlConfig, action } from "@rxweb/reactive-form-validators"
import { inputProcessor } from '../component-processor/input-processor';
import { labelChecker } from '../component-processor/element-checker';
@action([{
    keyName:'onlyLabel',
    actions: {
        label: function () {
            if (this.controlsConfig.firstName.value == 'ajay') {
                return "Hello Ajay, Enter your Last Name"
            }
            return "Enter your Last Name"
        }
    }
}])
export class LabelModel extends FormControlConfig {
}

describe('FormControlConfig Properties', () => {

    describe('label', () => {
        beforeEach(() => {
            ReactiveFormConfig.set({
                "dynamicForm": {
                    "uiFramework": "bootstrap"
                }
            });
        })    

        it('label should be undefined.', fakeAsync(() => {
            let options = inputProcessor({ dynamicFormConfiguration: { fieldConfigModels: [{ modelName: 'label', model: LabelModel }] }, component: BindingComponent, serverData: [{ name: "firstName", type: "textbox"}], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.label).toEqual('');
            labelChecker(options.nativeElement, { count: 1, innerText: '', display: 'none', index: 0 });
        }));

        it('label should the text of "Enter your First Name".', fakeAsync(() => {
            let options = inputProcessor({ dynamicFormConfiguration: { fieldConfigModels: [{ modelName: 'label', model: LabelModel }] },component: BindingComponent, serverData: [{ name: "firstName", type: "textbox", ui: { label: 'Enter your First Name' } }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.label).toEqual("Enter your First Name");
            labelChecker(options.nativeElement, { count: 1, innerText: 'Enter your First Name', display: '', index: 0 });
        }));

        it('LastName label should be "Enter your Last Name".', fakeAsync(() => {
            let options = inputProcessor({ dynamicFormConfiguration: { fieldConfigModels: [{ modelName: 'label', model: LabelModel }] }, component: BindingComponent, serverData: [{ name: "firstName", type: "textbox" }, { name: "lastName", type: "textbox", actionKeyNames: ["onlyLabel"], modelName: 'label' }], tagName: 'input', uiBindings: ['firstName', 'lastName'] })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.label).toEqual("Enter your Last Name");
            labelChecker(options.nativeElement, { count: 2, innerText: 'Enter your Last Name', display: '', index: 1 });
        }));

        it('LastName label should be changed when firstName value is "ajay".', fakeAsync(() => {
            let options = inputProcessor({ dynamicFormConfiguration: { fieldConfigModels: [{ modelName: 'label', model: LabelModel }] }, component: BindingComponent, serverData: [{ name: "firstName", type: "textbox" }, { name: "lastName", type: "textbox", actionKeyNames: ["onlyLabel"], modelName: 'label' }], tagName: 'input', uiBindings:['firstName','lastName'] })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.label).toEqual("Enter your Last Name");
            labelChecker(options.nativeElement, { count: 2, innerText: 'Enter your Last Name', display: '', index: 1 });
            options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.setValue("ajay");
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.label).toEqual("Hello Ajay, Enter your Last Name");
            labelChecker(options.nativeElement, { count: 2, innerText: 'Hello Ajay, Enter your Last Name', display: '', index: 1 });
        }));

        it('LastName label should be in initial state when firstName value is other than "ajay".', fakeAsync(() => {
            let options = inputProcessor({ dynamicFormConfiguration: { fieldConfigModels: [{ modelName: 'label', model: LabelModel }] }, component: BindingComponent, serverData: [{ name: "firstName", type: "textbox" }, { name: "lastName", type: "textbox", actionKeyNames: ["onlyLabel"], modelName: 'label' }], tagName: 'input', uiBindings: ['firstName', 'lastName'] })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.label).toEqual("Enter your Last Name");
            labelChecker(options.nativeElement, { count: 2, innerText: 'Enter your Last Name', display: '', index: 1 });
            options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.setValue("ajay");
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.label).toEqual("Hello Ajay, Enter your Last Name");
            labelChecker(options.nativeElement, { count: 2, innerText: 'Hello Ajay, Enter your Last Name', display: '', index: 1 });
            options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.setValue("ajai");
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.label).toEqual("Enter your Last Name");
            labelChecker(options.nativeElement, { count: 2, innerText: 'Enter your Last Name', display: '', index: 1 });
        }));

        //end
    })

})
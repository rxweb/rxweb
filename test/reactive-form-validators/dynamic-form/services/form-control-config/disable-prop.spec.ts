import { fakeAsync,tick, flush } from '@angular/core/testing';
import { BindingComponent } from "./components/binding.component"
import { ReactiveFormConfig, FormControlConfig, action, DynamicFormConfiguration } from "@rxweb/reactive-form-validators"
import { inputProcessor }  from '../component-processor/input-processor'

@action([{
    keyName:'onlyDisable',
    actions: {
        disable:function() { return this.controlsConfig.firstName.value == 'ajay' }
    }
}])
export class DisableModel extends FormControlConfig {
}

describe('FormControlConfig Properties', () => {

    describe('disable', () => {
        beforeEach(() => {
            ReactiveFormConfig.set({
                "dynamicForm": {
                    "uiFramework": "bootstrap"
                }
            });
        })    

        it('formControl should be disabled.', fakeAsync(() => {
            let options = inputProcessor({ dynamicFormConfiguration: { fieldConfigModels: [{ modelName: 'disable', model: DisableModel }] }, component: BindingComponent, serverData: [{ name: "firstName", type: "textbox", ui: { disable: true } }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.disabled).toBeTruthy();
        }));

        it('FormControlConfig disable property value should be true.', fakeAsync(() => {
            let options = inputProcessor({ dynamicFormConfiguration: { fieldConfigModels: [{ modelName: 'disable', model: DisableModel }] }, component: BindingComponent, serverData: [{ name: "firstName", type: "textbox", ui: { disable: true } }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.disable).toBeTruthy();
        }));

        it('LastName FormControl should not be disabled.', fakeAsync(() => {
            let options = inputProcessor({ dynamicFormConfiguration: { fieldConfigModels: [{ modelName: 'disable', model: DisableModel }] }, component: BindingComponent, serverData: [{ name: "firstName", type: "textbox" }, { name: "lastName", type: "textbox", actionKeyNames: ["onlyDisable"], modelName: 'disable' }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.disable).toBeFalsy();
        }));

        it('LastName FormControl should be disabled when firstName value is "ajay".', fakeAsync(() => {
            let options = inputProcessor({ dynamicFormConfiguration: { fieldConfigModels: [{ modelName: 'disable', model: DisableModel }] }, component: BindingComponent, serverData: [{ name: "firstName", type: "textbox" }, { name: "lastName", type: "textbox", actionKeyNames: ["onlyDisable"], modelName: 'disable' }], tagName: 'input', uiBindings:['firstName','lastName'] })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.disable).toBeFalsy();
            options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.setValue("ajay");
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.disable).toBeTruthy();
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.formControl.disabled).toBeTruthy();
        }));

        it('LastName FormControl should be disabled when firstName value is other than "ajay".', fakeAsync(() => {
            let options = inputProcessor({ dynamicFormConfiguration: { fieldConfigModels: [{ modelName: 'disable', model: DisableModel }] }, component: BindingComponent, serverData: [{ name: "firstName", type: "textbox" }, { name: "lastName", type: "textbox", actionKeyNames: ["onlyDisable"], modelName: 'disable' }], tagName: 'input', uiBindings: ['firstName', 'lastName'] })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.disable).toBeFalsy();
            options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.setValue("ajai");
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.disable).toBeFalsy();
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.formControl.disabled).toBeFalsy();
        }));



        //end
    })

})
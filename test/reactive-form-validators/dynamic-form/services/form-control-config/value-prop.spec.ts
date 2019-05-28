import { fakeAsync,tick, flush } from '@angular/core/testing';
import { InputBindingComponent } from "./components/input-binding.component"
import { ReactiveFormConfig, FormControlConfig, action, DynamicFormConfiguration } from "@rxweb/reactive-form-validators"
import { inputProcessor }  from '../component-processor/input-processor'

@action('value')
export class ValueModel extends FormControlConfig {

    private _v: any;

    set value(value: any) {
        this._v = value;
        if(value == "Ajay")
            this.controlsConfig["lastName"].value = "Ojha";
    }

    get value() {
        return this._v;
    }
}

describe('FormControlConfig Properties', () => {

    describe('value', () => {
        beforeEach(() => {
            ReactiveFormConfig.set({
                "dynamicForm": {
                    "uiFramework": "bootstrap"
                }
            });
        })    

        it('should same as server data object and config property object.', fakeAsync(() => {
            let options = inputProcessor({component:InputBindingComponent, serverData: [{ name: "firstName", type: "textbox" }],tagName:'input' })
            expect(options.instance.serverData[0]).toEqual(options.instance.dynamicFormBuildConfig.controlsConfig["firstName"].config);
        }));

        it('should work with the value is null.', fakeAsync(() => {
            let options = inputProcessor({ component: InputBindingComponent, serverData: [{ name: "firstName", type: "textbox",value:null }], tagName: 'input' })
            expect(options.element.value).toEqual("");
            expect(options.instance.dynamicFormBuildConfig.formGroup.controls.firstName.value).toEqual(null);
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.value).not.toBeDefined();
        }));

        it('should work with the value is undefined.', fakeAsync(() => {
            let options = inputProcessor({ component: InputBindingComponent, serverData: [{ name: "firstName", type: "textbox", value: undefined }], tagName: 'input' })
            expect(options.element.value).toEqual("");
            expect(options.instance.dynamicFormBuildConfig.formGroup.controls.firstName.value).toEqual(null);
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.value).not.toBeDefined();
        }));

        it('should same element as well as "value" property value.', fakeAsync(() => {
            let options = inputProcessor({ component: InputBindingComponent, serverData: [{ name: "firstName", type: "textbox", value: null }], tagName: 'input',elementValue:'Ajay' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.value).toEqual(options.element.value);
        }));

        it('should same as element and config object "value" value.', fakeAsync(() => {
            let options = inputProcessor({ component: InputBindingComponent, serverData: [{ name: "firstName", type: "textbox", value: null }], tagName: 'input', elementValue: 'Ajay' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.config.value).toEqual(options.element.value);
        }));

        it('should same as element and server data object "value" property value.', fakeAsync(() => {
            let options = inputProcessor({ component: InputBindingComponent, serverData: [{ name: "firstName", type: "textbox", value: null }], tagName: 'input', elementValue: 'Ajay' })
            expect(options.instance.serverData[0].value).toEqual(options.element.value);
        }));

        it('change formcontrol value while changing the value of FormControlConfig "value" property.', fakeAsync(() => {
            let options = inputProcessor({ component: InputBindingComponent, serverData: [{ name: "firstName", type: "textbox", value: null }], tagName: 'input', elementValue: 'Ajay' })
            let value = options.instance.dynamicFormBuildConfig.controlsConfig.firstName.value = "John";
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.value).toEqual(value);
            expect(options.instance.serverData[0].value).toEqual(value);
            expect(options.element.value).toEqual(value);
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.value).toEqual(value);
        }));

        it('change formcontrol value while changing the value of FormControlConfig "value" property.', fakeAsync(() => {
            let options = inputProcessor({ component: InputBindingComponent, serverData: [{ name: "firstName", type: "textbox", value: null }], tagName: 'input', elementValue: 'Ajay' })
            let value = options.instance.dynamicFormBuildConfig.controlsConfig.firstName.value = "John";
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.value).toEqual(value);
            expect(options.instance.serverData[0].value).toEqual(value);
            expect(options.element.value).toEqual(value);
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.value).toEqual(value);
        }));

        it('Conditionally change FormControl value.', fakeAsync(() => {
            let options = inputProcessor({ dynamicFormConfiguration: { fieldConfigModels: [{ modelName: 'value' }] }, component: InputBindingComponent, serverData: [{ name: "firstName", type: "textbox", value: null, modelName: 'value' }, { name: "lastName", type: "textbox", value: null }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.value).toEqual(undefined);
            let value = options.instance.dynamicFormBuildConfig.controlsConfig.firstName.value = "Ajay";
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.value).toEqual('Ojha');
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.value).toEqual(value);
        }));



        //end
    })

})
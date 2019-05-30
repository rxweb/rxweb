import { fakeAsync} from '@angular/core/testing';
import { BindingComponent } from "./components/binding.component"
import { ReactiveFormConfig, FormControlConfig, action } from "@rxweb/reactive-form-validators"
import { inputProcessor } from '../component-processor/input-processor';
import { placeholderChecker } from '../component-processor/element-checker';
@action('placeholder', [{
    keyName:'onlyPlaceholder',
    actions: {
        placeholder: function () {
            if (this.controlsConfig.firstName.value == 'ajay') {
                return "Enter your Last Name"
            }
            return "Last Name"
        }
    }
}])
export class PlaceholderModel extends FormControlConfig {
}

describe('FormControlConfig Properties', () => {

    describe('placeholder', () => {
        beforeEach(() => {
            ReactiveFormConfig.set({
                "dynamicForm": {
                    "uiFramework": "bootstrap"
                }
            });
        })    

        it('placeholder should be undefined.', fakeAsync(() => {
            let options = inputProcessor({ component: BindingComponent, serverData: [{ name: "firstName", type: "textbox"}], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.label).toEqual('');
            placeholderChecker(options.nativeElement, { count: 1, placeholder: '', index: 0 });
        }));

        it('placeholder text should be "Enter your First Name".', fakeAsync(() => {
            let options = inputProcessor({ component: BindingComponent, serverData: [{ name: "firstName", type: "textbox", ui: { placeholder: 'Enter your First Name' } }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.placeholder).toEqual("Enter your First Name");
            placeholderChecker(options.nativeElement, { count: 1, placeholder: 'Enter your First Name', index: 0 });
        }));

        it('LastName input element placeholder should be "Enter your Last Name".', fakeAsync(() => {
            let options = inputProcessor({ component: BindingComponent, serverData: [{ name: "firstName", type: "textbox" }, { name: "lastName", type: "textbox", actionKeyNames: ["onlyPlaceholder"], modelName: 'placeholder' }], tagName: 'input', uiBindings: ['firstName', 'lastName'] })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.placeholder).toEqual("Last Name");
            placeholderChecker(options.nativeElement, { count: 2, placeholder: 'Last Name', index: 1 });
        }));

        it('LastName input element placeholder text should be changed when firstName value is "ajay".', fakeAsync(() => {
            let options = inputProcessor({ component: BindingComponent, serverData: [{ name: "firstName", type: "textbox" }, { name: "lastName", type: "textbox", actionKeyNames: ["onlyPlaceholder"], modelName: 'placeholder' }], tagName: 'input', uiBindings:['firstName','lastName'] })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.placeholder).toEqual("Last Name");
            placeholderChecker(options.nativeElement, { count: 2, placeholder: 'Last Name', index: 1 });
            options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.setValue("ajay");
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.placeholder).toEqual("Enter your Last Name");
            placeholderChecker(options.nativeElement, { count: 2, placeholder: 'Enter your Last Name', index: 1 });
        }));

        it('LastName input element placeholder text should be in initial state when firstName value is other than "ajay".', fakeAsync(() => {
            let options = inputProcessor({ component: BindingComponent, serverData: [{ name: "firstName", type: "textbox" }, { name: "lastName", type: "textbox", actionKeyNames: ["onlyPlaceholder"], modelName: 'placeholder' }], tagName: 'input', uiBindings: ['firstName', 'lastName'] })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.placeholder).toEqual("Last Name");
            placeholderChecker(options.nativeElement, { count: 2, placeholder: 'Last Name', index: 1 });
            options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.setValue("ajay");
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.placeholder).toEqual("Enter your Last Name");
            placeholderChecker(options.nativeElement, { count: 2, placeholder: 'Enter your Last Name', index: 1 });
            options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.setValue("ajai");
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.placeholder).toEqual("Last Name");
            placeholderChecker(options.nativeElement, { count: 2, placeholder: 'Last Name', index: 1 });
        }));

        //end
    })

})
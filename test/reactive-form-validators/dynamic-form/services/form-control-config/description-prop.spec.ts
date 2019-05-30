import { fakeAsync} from '@angular/core/testing';
import { BindingComponent } from "./components/binding.component"
import { ReactiveFormConfig, FormControlConfig, action } from "@rxweb/reactive-form-validators"
import { inputProcessor } from '../component-processor/input-processor';
import { descriptionChecker } from '../component-processor/element-checker';
@action('description', [{
    keyName:'onlyDescription',
    actions: {
        description: function () {
            if (this.controlsConfig.firstName.value == 'ajay') {
                return "Enter your Last Name"
            }
            return "Last Name"
        }
    }
}])
export class DescriptionModel extends FormControlConfig {
}

describe('FormControlConfig Properties', () => {

    describe('description', () => {
        beforeEach(() => {
            ReactiveFormConfig.set({
                "dynamicForm": {
                    "uiFramework": "bootstrap"
                }
            });
        })    

        it('description should be undefined.', fakeAsync(() => {
            let options = inputProcessor({ component: BindingComponent, serverData: [{ name: "firstName", type: "textbox"}], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.description).toEqual('');
            descriptionChecker(options.nativeElement, { count: 1, textContent: '', display:'none',index: 0 });
        }));

        it('description text should be "Enter your First Name".', fakeAsync(() => {
            let options = inputProcessor({ component: BindingComponent, serverData: [{ name: "firstName", type: "textbox", ui: { description: 'Enter your First Name' } }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.description).toEqual("Enter your First Name");
            descriptionChecker(options.nativeElement, { count: 1, textContent: 'Enter your First Name',display:'', index: 0 });
        }));

        it('LastName input element description should be "Enter your Last Name".', fakeAsync(() => {
            let options = inputProcessor({ component: BindingComponent, serverData: [{ name: "firstName", type: "textbox" }, { name: "lastName", type: "textbox", actionKeyNames: ["onlyDescription"], modelName: 'description' }], tagName: 'input', uiBindings: ['firstName', 'lastName'] })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.description).toEqual("Last Name");
            descriptionChecker(options.nativeElement, { count: 2, textContent: 'Last Name',display:'', index: 1 });
        }));

        it('LastName input element description text should be changed when firstName value is "ajay".', fakeAsync(() => {
            let options = inputProcessor({ component: BindingComponent, serverData: [{ name: "firstName", type: "textbox" }, { name: "lastName", type: "textbox", actionKeyNames: ["onlyDescription"], modelName: 'description' }], tagName: 'input', uiBindings:['firstName','lastName'] })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.description).toEqual("Last Name");
            descriptionChecker(options.nativeElement, { count: 2, textContent: 'Last Name', display: '', index: 1 });
            options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.setValue("ajay");
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.description).toEqual("Enter your Last Name");
            descriptionChecker(options.nativeElement, { count: 2, textContent: "Enter your Last Name", display: '', index: 1 });
        }));

        it('LastName input element description text should be in initial state when firstName value is other than "ajay".', fakeAsync(() => {
            let options = inputProcessor({ component: BindingComponent, serverData: [{ name: "firstName", type: "textbox" }, { name: "lastName", type: "textbox", actionKeyNames: ["onlyDescription"], modelName: 'description' }], tagName: 'input', uiBindings: ['firstName', 'lastName'] })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.description).toEqual("Last Name");
            descriptionChecker(options.nativeElement, { count: 2, textContent: 'Last Name', display: '', index: 1 });
            options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.setValue("ajay");
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.description).toEqual("Enter your Last Name");
            descriptionChecker(options.nativeElement, { count: 2, textContent: "Enter your Last Name", display: '', index: 1 });
            options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.setValue("ajai");
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.description).toEqual("Last Name");
            descriptionChecker(options.nativeElement, { count: 2, textContent: "Last Name", display: '', index: 1 });
        }));

        //end
    })

})
import { fakeAsync} from '@angular/core/testing';
import { BindingComponent } from "./components/binding.component"
import { ReactiveFormConfig, FormControlConfig, action } from "@rxweb/reactive-form-validators"
import { inputProcessor } from '../component-processor/input-processor';
import { readonlyChecker } from '../component-processor/element-checker';
@action('readonly', [{
    keyName:'onlyReadonly',
    actions: {
        readonly: function () {
            return this.controlsConfig.firstName.value == 'ajay';
        }
    }
}])
export class ReadonlyModel extends FormControlConfig {
}

describe('FormControlConfig Properties', () => {

    describe('readonly', () => {
        beforeEach(() => {
            ReactiveFormConfig.set({
                "dynamicForm": {
                    "uiFramework": "bootstrap"
                }
            });
        })    

        it('readonly should be undefined.', fakeAsync(() => {
            let options = inputProcessor({ component: BindingComponent, serverData: [{ name: "firstName", type: "textbox"}], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.readonly).toBeFalsy();
            readonlyChecker(options.nativeElement, { count: 1, readonly: false, index: 0 });
        }));

        it('readonly should be true.', fakeAsync(() => {
            let options = inputProcessor({ component: BindingComponent, serverData: [{ name: "firstName", type: "textbox", ui: { readonly: true } }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.readonly).toBeTruthy();
            readonlyChecker(options.nativeElement, { count: 1, readonly: true, index: 0 });
        }));

        it('LastName input element readonly should be false.', fakeAsync(() => {
            let options = inputProcessor({ component: BindingComponent, serverData: [{ name: "firstName", type: "textbox" }, { name: "lastName", type: "textbox", actionKeyNames: ["onlyReadonly"], modelName: 'readonly' }], tagName: 'input', uiBindings: ['firstName', 'lastName'] })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.readonly).toBeFalsy();
            readonlyChecker(options.nativeElement, { count: 2, readonly: false, index: 1 });
        }));

        it('LastName input element mark as readonly when firstName value is "ajay".', fakeAsync(() => {
            let options = inputProcessor({ component: BindingComponent, serverData: [{ name: "firstName", type: "textbox" }, { name: "lastName", type: "textbox", actionKeyNames: ["onlyReadonly"], modelName: 'readonly' }], tagName: 'input', uiBindings:['firstName','lastName'] })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.readonly).toBeFalsy();
            readonlyChecker(options.nativeElement, { count: 2, readonly: false, index: 1 });
            options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.setValue("ajay");
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.readonly).toBeTruthy();
            readonlyChecker(options.nativeElement, { count: 2, readonly: true, index: 1 });
        }));

        it('LastName input element should be in initial state when firstName value is other than "ajay".', fakeAsync(() => {
            let options = inputProcessor({ component: BindingComponent, serverData: [{ name: "firstName", type: "textbox" }, { name: "lastName", type: "textbox", actionKeyNames: ["onlyReadonly"], modelName: 'readonly' }], tagName: 'input', uiBindings: ['firstName', 'lastName'] })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.readonly).toBeFalsy();
            readonlyChecker(options.nativeElement, { count: 2, readonly: false, index: 1 });
            options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.setValue("ajay");
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.readonly).toBeTruthy();
            readonlyChecker(options.nativeElement, { count: 2, readonly: true, index: 1 });
            options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.setValue("ajai");
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.readonly).toBeFalsy();
            readonlyChecker(options.nativeElement, { count: 2, readonly: false, index: 1 });
        }));

        //end
    })

})
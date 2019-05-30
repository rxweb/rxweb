import { fakeAsync} from '@angular/core/testing';
import { BindingComponent } from "./components/binding.component"
import { ReactiveFormConfig, FormControlConfig, action } from "@rxweb/reactive-form-validators"
import { inputProcessor } from '../component-processor/input-processor';
import { hideChecker } from '../component-processor/element-checker';
@action('hide', [{
    keyName:'onlyHide',
    actions: {
        hide: function () {
            return this.controlsConfig.firstName.value == 'ajay';
        }
    }
}])
export class HideModel extends FormControlConfig {
}

describe('FormControlConfig Properties', () => {

    describe('hide', () => {
        beforeEach(() => {
            ReactiveFormConfig.set({
                "dynamicForm": {
                    "uiFramework": "bootstrap"
                }
            });
        })    

        it('firstName input element should not hide.', fakeAsync(() => {
            let options = inputProcessor({ component: BindingComponent, serverData: [{ name: "firstName", type: "textbox"}], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.hide).toEqual(false);
            hideChecker(options.nativeElement, { count: 1, display: '', index: 0,tagName:"input" });
        }));

        it('element should hide.', fakeAsync(() => {
            let options = inputProcessor({ component: BindingComponent, serverData: [{ name: "firstName", type: "textbox", ui: { hide: true } }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.hide).toBeTruthy();
            hideChecker(options.nativeElement, { count: 0, index: 0, tagName: "input" });
        }));

        it('LastName input element should not be hide.', fakeAsync(() => {
            let options = inputProcessor({ component: BindingComponent, serverData: [{ name: "firstName", type: "textbox" }, { name: "lastName", type: "textbox", actionKeyNames: ["onlyHide"], modelName: 'hide' }], tagName: 'input', uiBindings: ['firstName', 'lastName'] })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.hide).toBeFalsy()
            hideChecker(options.nativeElement, { count: 2, display: '', index: 1, tagName: "input" });
        }));

        it('LastName input element placeholder text should be changed when firstName value is "ajay".', fakeAsync(() => {
            let options = inputProcessor({ component: BindingComponent, serverData: [{ name: "firstName", type: "textbox" }, { name: "lastName", type: "textbox", actionKeyNames: ["onlyHide"], modelName: 'hide' }], tagName: 'input', uiBindings:['firstName','lastName'] })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.hide).toBeFalsy();
            hideChecker(options.nativeElement, { count: 2, display: '', index: 1, tagName: "input" });
            options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.setValue("ajay");
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.hide).toBeTruthy();
            hideChecker(options.nativeElement, { count: 1, index: 1, tagName: "input" });
        }));
        //bug
        //it('LastName input element placeholder text should be in initial state when firstName value is other than "ajay".', fakeAsync(() => {
        //    let options = inputProcessor({ component: BindingComponent, serverData: [{ name: "firstName", type: "textbox" }, { name: "lastName", type: "textbox", actionKeyNames: ["onlyHide"], modelName: 'hide' }], tagName: 'input', uiBindings: ['firstName', 'lastName'] })
        //    expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.hide).toBeFalsy();
        //    hideChecker(options.nativeElement, { count: 2, index: 1, tagName: "input" });
        //    options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.setValue("ajay");
        //    expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.hide).toBeTruthy();
        //    hideChecker(options.nativeElement, { count: 1, index: 1, tagName: "input" });
        //    options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.setValue("ajai");
        //    expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.hide).toBeFalsy();
        //    hideChecker(options.nativeElement, { count: 2, index: 1, tagName: "input" });
        //}));

        //end
    })

})
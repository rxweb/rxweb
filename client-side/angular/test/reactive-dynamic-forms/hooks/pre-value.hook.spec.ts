import { fakeAsync,tick} from '@angular/core/testing';
import { BindingComponent } from "../components/binding.component"
import { inputProcessor } from '../base/input-processor';
import { PreValueHookModel } from '../models/pre-value-hook-model'
import { getElement } from '../base/element-checker';


describe('FormControlConfig Properties', () => {

    describe('pre-value-hook', () => {

        it('value should be applied', fakeAsync(() => {
            let dynamicFormConfiguration = {
                controlConfigModels: [{ modelName: 'preValueHook', model: PreValueHookModel}],
            }
            let options = inputProcessor({ dynamicFormConfiguration: dynamicFormConfiguration, uiBindings: ["firstName"], component: BindingComponent, serverData: [{ modelName: 'preValueHook', name: "firstName", type: "text" }], tagName: 'input' })
            let element = getElement(options.nativeElement, "input");
            element.value = "India";
            element.dispatchEvent(new Event("input"));
            tick(100);
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.value).toEqual("India");
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.value).toEqual("India");
        }));

       it('"USA" value should not be applied', fakeAsync(() => {
            let dynamicFormConfiguration = {
                controlConfigModels: [{ modelName: 'preValueHook', model: PreValueHookModel }],
            }
            let options = inputProcessor({ dynamicFormConfiguration: dynamicFormConfiguration, uiBindings: ["firstName"], component: BindingComponent, serverData: [{ modelName: 'preValueHook', name: "firstName", type: "text" }], tagName: 'input' })
            let element = getElement(options.nativeElement, "input");
            element.value = "USA";
            element.dispatchEvent(new Event("input"));
            tick(100);
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.value).toEqual(undefined);
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.value).toEqual(null);
        }));


        //end
    })

})
import { fakeAsync,tick} from '@angular/core/testing';
import { BindingComponent } from "../components/binding.component"
import { inputProcessor } from '../base/input-processor';
import { PostValueHookModel } from '../models/post-value-hook-model'
import { getElements } from '../base/element-checker';


describe('FormControlConfig Properties', () => {

    describe('post-value-hook', () => {

        it('value should be applied', fakeAsync(() => {
            let dynamicFormConfiguration = {
                controlConfigModels: [{ modelName: 'postValueHookModel', model: PostValueHookModel}],
            }
            let options = inputProcessor({ dynamicFormConfiguration: dynamicFormConfiguration, uiBindings: ["firstName","lastName"], component: BindingComponent, serverData: [{ modelName: 'postValueHookModel', name: "firstName", type: "text" }, { name: "lastName", type: "text" }], tagName: 'input' })
            let elements = getElements(options.nativeElement, "input");
            elements[0].value = "Bharat";
            elements[0].dispatchEvent(new Event("input"));
            tick(100);
            expect(elements.length).toEqual(2);
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.value).toEqual("Patel");
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.lastName.formControl.value).toEqual("Patel");
            expect(elements[1].value).toEqual("Patel");
        }));

        //end
    })

})
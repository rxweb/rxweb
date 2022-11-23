import { fakeAsync,tick} from '@angular/core/testing';
import { BindingComponent } from "../components/binding.component"
import { inputProcessor } from '../base/input-processor';
import { AsyncCustomValidation } from '../models/async-custom-validation-model'


describe('FormControlConfig Properties', () => {

    describe('async-custom-validation', () => {

        it('FormControl should be valid.', fakeAsync(() => {
            let dynamicFormConfiguration = {
                controlConfigModels: [{ modelName: 'validationModel', model: AsyncCustomValidation}],
            }
            let options = inputProcessor({ dynamicFormConfiguration: dynamicFormConfiguration , uiBindings: ["firstName"], component: BindingComponent, serverData: [{modelName:'validationModel', name: "firstName", type: "text", value: 'India' }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.valid).toBeTruthy();
        }));

        it('FormControl should be invalid.', fakeAsync(() => {
            let dynamicFormConfiguration = {
                controlConfigModels: [{ modelName: 'validationModel', model: AsyncCustomValidation}],
            }
            let options = inputProcessor({ dynamicFormConfiguration: dynamicFormConfiguration, uiBindings: ["firstName"], component: BindingComponent, serverData: [{ modelName: 'validationModel', name: "firstName", type: "text", value: 'USA' }], tagName: 'input' })
            tick(100);
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.valid).toBeFalsy();
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.errors).toEqual({
                required: { message: 'Custom Async Message' }
            });
        }));

        

        //end
    })

})
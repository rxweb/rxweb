import { fakeAsync} from '@angular/core/testing';
import { BindingComponent } from "../components/binding.component"
import { inputProcessor } from '../base/input-processor';
import { NonAsyncCustomValidation } from '../models/non-async-custom-validation-model'


describe('FormControlConfig Properties', () => {

    describe('non-async-custom-validation', () => {

        it('FormControl should be valid.', fakeAsync(() => {
            let dynamicFormConfiguration = {
                controlConfigModels: [{ modelName: 'validationModel', model: NonAsyncCustomValidation }],
            }
            let options = inputProcessor({ dynamicFormConfiguration: dynamicFormConfiguration , uiBindings: ["firstName"], component: BindingComponent, serverData: [{modelName:'validationModel', name: "firstName", type: "text", value: 'India' }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.valid).toBeTruthy();
        }));

        it('FormControl should be invalid.', fakeAsync(() => {
            let dynamicFormConfiguration = {
                controlConfigModels: [{ modelName: 'validationModel', model: NonAsyncCustomValidation }],
            }
            let options = inputProcessor({ dynamicFormConfiguration: dynamicFormConfiguration, uiBindings: ["firstName"], component: BindingComponent, serverData: [{ modelName: 'validationModel', name: "firstName", type: "text", value: 'USA' }], tagName: 'input' })
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.valid).toBeFalsy();
            expect(options.instance.dynamicFormBuildConfig.controlsConfig.firstName.formControl.errors).toEqual({
                required: { message: 'Custom Required' }
            });
        }));

        

        //end
    })

})
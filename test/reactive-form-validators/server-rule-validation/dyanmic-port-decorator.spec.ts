import { ReactiveFormConfig, RxFormBuilder, FormBuilderConfiguration, RxFormGroup } from '../../../packages/reactive-form-validators';

import { port, prop, } from "../../../packages/reactive-form-validators"

export class User {

	@prop()
	browser: string;

	@prop()
	shoppingWebsitePort: string;

	@prop()
	educationalWebsitePort: string;

}

(function () {
    describe('Dynamic Validation decorator', () => {
        let formBuilder = new RxFormBuilder();
        beforeEach(() => {
            ReactiveFormConfig.set({
                "validationMessage": {
                    "port": "Please enter a valid port number",
                }
            });
        });
        describe('port dynamic validation', () => {

            let user = new User();
            it('should not error in shoppingWebsitePort with conditional expression in dynamic port validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        browser: {},
                        shoppingWebsitePort: {
                            port: { conditionalExpression: 'x => x.browser == "Chrome"', }
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.browser.setValue('Chrome');
                    userFormGroup.controls.shoppingWebsitePort.setValue(8080);
                    expect(userFormGroup.controls.shoppingWebsitePort.errors).toBeNull();
                });

            it('should not error in shoppingWebsitePort with conditional expression in dynamic port validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        browser: {},
                        shoppingWebsitePort: {
                            port: { conditionalExpression: 'x => x.browser == "Chrome"', }
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.browser.setValue('Firefox');
                    userFormGroup.controls.shoppingWebsitePort.setValue(505055);
                    expect(userFormGroup.controls.shoppingWebsitePort.errors).toBeNull();
                });

            it('should error in shoppingWebsitePort with conditional expression in dynamic port validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        browser: {},
                        shoppingWebsitePort: {
                            port: { conditionalExpression: 'x => x.browser == "Chrome"', }
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.browser.setValue('Chrome');
                    userFormGroup.controls.shoppingWebsitePort.setValue(505055);
                    expect(userFormGroup.controls.shoppingWebsitePort.errors).toEqual({ 'port': { message: 'Please enter a valid port number', refValues: [505055] } });
                });

            it('should error in educationalWebsitePort adding custom message in dynamic port validation.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        educationalWebsitePort: {
                            port: { message: '{{0}} is not a port number.', }
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.educationalWebsitePort.setValue(20000000);
                    expect(userFormGroup.controls.educationalWebsitePort.errors).toEqual({ 'port': { message: '20000000 is not a port number.', refValues: [20000000] } });
                });
            //end
        });
    });
})();
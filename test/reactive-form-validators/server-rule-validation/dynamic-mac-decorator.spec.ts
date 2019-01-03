import { ReactiveFormConfig, RxFormBuilder, FormBuilderConfiguration, RxFormGroup } from '../../../packages/reactive-form-validators';

import { mac, prop, } from "../../../packages/reactive-form-validators"

export class MacAddressInfo {

	@prop()
	device: string;

	@prop()
	localMacAddress: string;

	@prop()
	systemMacAddress: string;

}

(function () {
    describe('Dynamic Validation decorator', () => {
        let formBuilder = new RxFormBuilder();
        beforeEach(() => {
            ReactiveFormConfig.set({
                "validationMessage": {
                    "mac": "Please enter a valid mac number",
                }
            });
        });
        describe('mac dynamic validation', () => {

            let macAddressInfo = new MacAddressInfo();
            it('should not error in localMacAddress with conditional expression in dynamic mac validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        device: {},
                        localMacAddress: {
                            mac: { conditionalExpression: 'x => x.device == "Laptop"', }
                        }
                    }
                    let macAddressInfoFormGroup = <RxFormGroup>formBuilder.formGroup(macAddressInfo, formBuilderConfiguration);
                    macAddressInfoFormGroup.controls.device.setValue('Laptop');
                    macAddressInfoFormGroup.controls.localMacAddress.setValue('00:0a:95:9d:68:16');
                    expect(macAddressInfoFormGroup.controls.localMacAddress.errors).toBeNull();
                });

            it('should not error in localMacAddress with conditional expression in dynamic mac validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        device: {},
                        localMacAddress: {
                            mac: { conditionalExpression: 'x => x.device == "Laptop"', }
                        }
                    }
                    let macAddressInfoFormGroup = <RxFormGroup>formBuilder.formGroup(macAddressInfo, formBuilderConfiguration);
                    macAddressInfoFormGroup.controls.device.setValue('Smart Phone');
                    macAddressInfoFormGroup.controls.localMacAddress.setValue('00:0a:95');
                    expect(macAddressInfoFormGroup.controls.localMacAddress.errors).toBeNull();
                });

            it('should error in localMacAddress with conditional expression in dynamic mac validation with string.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        device: {},
                        localMacAddress: {
                            mac: { conditionalExpression: 'x => x.device == "Laptop"', }
                        }
                    }
                    let macAddressInfoFormGroup = <RxFormGroup>formBuilder.formGroup(macAddressInfo, formBuilderConfiguration);
                    macAddressInfoFormGroup.controls.device.setValue('Laptop');
                    macAddressInfoFormGroup.controls.localMacAddress.setValue('9d:68:16');
                    expect(macAddressInfoFormGroup.controls.localMacAddress.errors).toEqual({ 'mac': { message: 'Please enter a valid mac number', refValues: ['9d:68:16'] } });
                });

            it('should error in systemMacAddress adding custom message in dynamic mac validation.',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        systemMacAddress: {
                            mac: { message: '{{0}} is not a mac number.', }
                        }
                    }
                    let macAddressInfoFormGroup = <RxFormGroup>formBuilder.formGroup(macAddressInfo, formBuilderConfiguration);
                    macAddressInfoFormGroup.controls.systemMacAddress.setValue('00:0a:16');
                    expect(macAddressInfoFormGroup.controls.systemMacAddress.errors).toEqual({ 'mac': { message: '00:0a:16 is not a mac number.', refValues: ['00:0a:16'] } });
                });
            //end
        });
    });
})();
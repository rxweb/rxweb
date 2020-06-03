import { prop, ReactiveFormConfig, RxFormBuilder, FormBuilderConfiguration, RxFormGroup } from '@rxweb/reactive-form-validators';

export class Location {

    @prop()
    countryName: string;

    @prop()
    stateName: string;

    @prop()
    cityName: string;

}

describe('Dynamic Validation decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
        ReactiveFormConfig.set({
            "validationMessage": {
                "upperCase": "Input must be in Uppercase",
            }
        });
    });
    describe('upperCase dynamic validation', () => {

        let location = new Location();

        it('should not error in countryName adding dynamic upperCase validation',
            () => {
                let formBuilderConfiguration = new FormBuilderConfiguration();
                formBuilderConfiguration.dynamicValidation = {
                    countryName: {
                        upperCase: true
                    }
                };
                let locationFormGroup = <RxFormGroup>formBuilder.formGroup(location, formBuilderConfiguration);
                locationFormGroup.controls.countryName.setValue('INDIA');
                expect(locationFormGroup.controls.countryName.errors).toBeNull();
            });

        it('should error in countryName adding dynamic upperCase validation',
            () => {
                let formBuilderConfiguration = new FormBuilderConfiguration();
                formBuilderConfiguration.dynamicValidation = {
                    countryName: {
                        upperCase: true
                    }
                };
                let locationFormGroup = <RxFormGroup>formBuilder.formGroup(location, formBuilderConfiguration);
                locationFormGroup.controls.countryName.setValue('India');
                expect(locationFormGroup.controls.countryName.errors).toEqual({ 'upperCase': { message: 'Input must be in Uppercase', refValues: ['India'] } });
            });

        it('should not error in stateName with conditional expression in dynamic upperCase validation with string.',
            () => {
                let formBuilderConfiguration = new FormBuilderConfiguration();
                formBuilderConfiguration.dynamicValidation = {
                    countryName: {
                        upperCase: true
                    },
                    stateName: {
                        upperCase: { conditionalExpression: 'x => x.countryName == "INDIA"', }
                    }
                }
                let locationFormGroup = <RxFormGroup>formBuilder.formGroup(location, formBuilderConfiguration);
                locationFormGroup.controls.countryName.setValue('INDIA');
                locationFormGroup.controls.stateName.setValue('RAJASTHAN');
                expect(locationFormGroup.controls.stateName.errors).toBeNull();
            });

        it('should not error in stateName with conditional expression in dynamic upperCase validation with string.',
            () => {
                let formBuilderConfiguration = new FormBuilderConfiguration();
                formBuilderConfiguration.dynamicValidation = {
                    countryName: {
                        upperCase: true
                    },
                    stateName: {
                        upperCase: { conditionalExpression: 'x => x.countryName == "INDIA"', }
                    }
                }
                let locationFormGroup = <RxFormGroup>formBuilder.formGroup(location, formBuilderConfiguration);
                locationFormGroup.controls.countryName.setValue('AUSTRALIA');
                locationFormGroup.controls.stateName.setValue('Queensland');
                expect(locationFormGroup.controls.stateName.errors).toBeNull();
            });

        it('should error in stateName with conditional expression in dynamic upperCase validation with string.',
            () => {
                let formBuilderConfiguration = new FormBuilderConfiguration();
                formBuilderConfiguration.dynamicValidation = {
                    countryName: {
                        upperCase: true
                    },
                    stateName: {
                        upperCase: { conditionalExpression: 'x => x.countryName == "INDIA"', }
                    }
                }
                let locationFormGroup = <RxFormGroup>formBuilder.formGroup(location, formBuilderConfiguration);
                locationFormGroup.controls.countryName.setValue('INDIA');
                locationFormGroup.controls.stateName.setValue('Rajasthan');
                expect(locationFormGroup.controls.stateName.errors).toEqual({ 'upperCase': { message: 'Input must be in Uppercase', refValues: ['Rajasthan'] } });
            });

        it('should error in cityName adding custom message in dynamic upperCase validation.',
            () => {
                let formBuilderConfiguration = new FormBuilderConfiguration();
                formBuilderConfiguration.dynamicValidation = {
                    cityName: {
                        upperCase: { message: 'You can enter only upperCase letters.', }
                    }
                }
                let locationFormGroup = <RxFormGroup>formBuilder.formGroup(location, formBuilderConfiguration);
                locationFormGroup.controls.cityName.setValue('Udaipur');
                expect(locationFormGroup.controls.cityName.errors).toEqual({ 'upperCase': { message: 'You can enter only upperCase letters.', refValues: ['Udaipur'] } });
            });
        //end
    });
});

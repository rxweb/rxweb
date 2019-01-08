import { ReactiveFormConfig,RxFormBuilder, FormBuilderConfiguration, RxFormGroup, prop } from '../../../packages/reactive-form-validators';

export class Country {

	@prop()
	continent: string;

	@prop()
	thirdCountryLongitude: string;

	@prop()
	firstCountryLongitude: string;

}

(function() {
    describe('Dyanmic-longitude-validation-decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "longitude": "Please enter a valid longitude",
          }
        });
      });
  
      describe('longitudeDecorator', () => {
        let country = new Country();
        it('should not error in thirdCountryLongitude with conditional expression in dynamic longitude validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            continent:{},thirdCountryLongitude:{longitude:{conditionalExpression:"x => x.continent ==\"Asia\""}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(country,formBuilderConfiguration);
          userInfoFormGroup.controls.continent.setValue('Asia');
          userInfoFormGroup.controls.thirdCountryLongitude.setValue('27.0238');
          expect(userInfoFormGroup.controls.thirdCountryLongitude.errors).toBeNull();
        });

        it('should not error in thirdCountryLongitude with conditional expression in dynamic longitude validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            continent:{},thirdCountryLongitude:{longitude:{conditionalExpression:"x => x.continent ==\"Asia\""}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(country,formBuilderConfiguration);
          userInfoFormGroup.controls.continent.setValue('Australia');
          userInfoFormGroup.controls.thirdCountryLongitude.setValue('238');
          expect(userInfoFormGroup.controls.thirdCountryLongitude.errors).toBeNull();
        });

        it('should error in thirdCountryLongitude with conditional expression in dynamic longitude validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            continent:{},thirdCountryLongitude:{longitude:{conditionalExpression:"x => x.continent ==\"Asia\""}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(country,formBuilderConfiguration);
          userInfoFormGroup.controls.continent.setValue('Asia');
          userInfoFormGroup.controls.thirdCountryLongitude.setValue('238');
          expect(userInfoFormGroup.controls.thirdCountryLongitude.errors).toEqual({'longitude':{ message: 'Please enter a valid longitude', refValues: [ '238' ] } });
        });

        it('should error in firstCountryLatitude custom message in dynamic latitude validation.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            firstCountryLongitude:{longitude:{message:"{{0}} is not a longitude"}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(country,formBuilderConfiguration);
          userInfoFormGroup.controls.firstCountryLongitude.setValue('942D');
          expect(userInfoFormGroup.controls.firstCountryLongitude.errors).toEqual({'longitude':{ message: '942D is not a longitude', refValues: [ '942D' ] } });
        });

      })
    })
})();
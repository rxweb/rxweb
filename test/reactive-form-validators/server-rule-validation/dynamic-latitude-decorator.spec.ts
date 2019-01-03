import { ReactiveFormConfig,RxFormBuilder, FormBuilderConfiguration, RxFormGroup, prop } from '../../../packages/reactive-form-validators';

export class Country {

	@prop()
	continent: string;

	@prop()
	thirdCountryLatitude: string;

	@prop()
	firstCountryLatitude: string;

}

(function() {
    describe('Dyanmic-latitude-validation-decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "latitude": "Please enter a valid latitude",
          }
        });
      });
  
      describe('latitudeDecorator', () => {
          let country = new Country();  
          it('should not error in thirdCountryLatitude with conditional expression in dynamic latitude validation with string.',
          () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                continent:{},thirdCountryLatitude:{latitude:{conditionalExpression:"x => x.continent ==\"Asia\""}}
          };
            let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(country,formBuilderConfiguration);
            userInfoFormGroup.controls.continent.setValue('Asia');
            userInfoFormGroup.controls.thirdCountryLatitude.setValue('#946B2D');
            expect(userInfoFormGroup.controls.thirdCountryLatitude.errors).toBeNull();
          });

      });
    });
})();   
import { ReactiveFormConfig,RxFormBuilder, FormBuilderConfiguration, RxFormGroup, prop } from '@rxweb/reactive-form-validators';

export class Country {

	@prop()
	continent: string;

	@prop()
	thirdCountryLatitude: string;

	@prop()
	firstCountryLatitude: string;

}

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
            userInfoFormGroup.controls.thirdCountryLatitude.setValue('20.5937');
            expect(userInfoFormGroup.controls.thirdCountryLatitude.errors).toBeNull();
          });

          it('should error in thirdCountryLatitude with conditional expression in dynamic latitude validation with string.',
          () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                continent:{},thirdCountryLatitude:{latitude:{conditionalExpression:"x => x.continent ==\"Asia\""}}
          };
            let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(country,formBuilderConfiguration);
            userInfoFormGroup.controls.continent.setValue('Asia');
            userInfoFormGroup.controls.thirdCountryLatitude.setValue('5937');
            expect(userInfoFormGroup.controls.thirdCountryLatitude.errors).toEqual({'latitude':{ message: 'Please enter a valid latitude', refValues: [ '5937' ] } });
          });

          it('should error in firstCountryLatitude custom message in dynamic latitude validation.',
          () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                firstCountryLatitude:{latitude:{message:"{{0}} is not a latitude"}}
          };
            let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(country,formBuilderConfiguration);
            userInfoFormGroup.controls.firstCountryLatitude.setValue('942D');
            expect(userInfoFormGroup.controls.firstCountryLatitude.errors).toEqual({'latitude':{ message: '942D is not a latitude', refValues: [ '942D' ] } });
          }); 

      });
    });

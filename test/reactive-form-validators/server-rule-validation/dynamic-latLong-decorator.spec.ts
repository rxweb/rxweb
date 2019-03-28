import { ReactiveFormConfig,RxFormBuilder, FormBuilderConfiguration, RxFormGroup, prop } from '../../../packages/reactive-form-validators';


export class Country {

	@prop()
	continent: string;

	@prop()
	thirdCountry: string;

	@prop()
	firstCountry: string;

}


    describe('Dyanmic-latLong-validation-decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "latLong": "Please enter a valid latLong",
          }
        });
      });
  
      describe('latitudeDecorator', () => {
        let country = new Country(); 
        it('should not error in thirdCountryLatitude with conditional expression in dynamic latitude validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            continent:{},thirdCountry:{latLong:{conditionalExpression:"x => x.continent ==\"Asia\""}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(country,formBuilderConfiguration);
          userInfoFormGroup.controls.continent.setValue('Asia');
          userInfoFormGroup.controls.thirdCountry.setValue('27.0238, 74.2179');
          expect(userInfoFormGroup.controls.thirdCountry.errors).toBeNull();
        });

        it('should not error in thirdCountryLatitude with conditional expression in dynamic latitude validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            continent:{},thirdCountry:{latLong:{conditionalExpression:"x => x.continent ==\"Asia\""}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(country,formBuilderConfiguration);
          userInfoFormGroup.controls.continent.setValue('Australia');
          userInfoFormGroup.controls.thirdCountry.setValue('2179');
          expect(userInfoFormGroup.controls.thirdCountry.errors).toBeNull();
        });

        it('should error in thirdCountryLatitude with conditional expression in dynamic latitude validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            continent:{},thirdCountry:{latLong:{conditionalExpression:"x => x.continent ==\"Asia\""}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(country,formBuilderConfiguration);
          userInfoFormGroup.controls.continent.setValue('Asia');
          userInfoFormGroup.controls.thirdCountry.setValue('2179');
          expect(userInfoFormGroup.controls.thirdCountry.errors).toEqual({'latLong':{ message: 'Please enter a valid latLong', refValues: [ '2179' ] } });
        });
        it('should error in firstCountry custom message in dynamic latitude validation.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            firstCountry:{latLong:{message:"{{0}} is not a proper proper Latitude or Longitude"}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(country,formBuilderConfiguration);
          userInfoFormGroup.controls.firstCountry.setValue('942D');
          expect(userInfoFormGroup.controls.firstCountry.errors).toEqual({'latLong':{ message: '942D is not a proper proper Latitude or Longitude', refValues: [ '942D' ] } });
        }); 

      })
    })

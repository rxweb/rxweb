import { ReactiveFormConfig,RxFormBuilder, FormBuilderConfiguration, RxFormGroup, prop } from '../../../packages/reactive-form-validators';

export class User {

	@prop()
	language: string;

	@prop()
	alphabetAsciiCode: string;

	@prop()
	specialCharAsciiCode: string;

}

(function() {
    describe('Dyanmic-ascii-validation-decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "ascii": "Please enter an ascii code",
          }
        });
      });

      describe('asciiDecorator', () => {
        let user = new User();  
        it('should not error in alphabetAsciiCode with conditional expression in dynamic ascii validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            language : {           
            },
             alphabetAsciiCode : {
             ascii :  {conditionalExpression:'x => x.language =="Java"',} 
         }
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.language.setValue('Java');
          userInfoFormGroup.controls.alphabetAsciiCode.setValue('56');
          expect(userInfoFormGroup.controls.alphabetAsciiCode.errors).toBeNull();
        });

        it('should not error in alphabetAsciiCode with conditional expression in dynamic ascii validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            language : {           
            },
            alphabetAsciiCode : {
             ascii :  {conditionalExpression:'x => x.language =="Java"',} 
         }
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.language.setValue('C#');
          userInfoFormGroup.controls.alphabetAsciiCode.setValue('中國哲學');
          expect(userInfoFormGroup.controls.alphabetAsciiCode.errors).toBeNull();
        });

        it('should not error in alphabetAsciiCode with conditional expression in dynamic ascii validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            language : {           
            },
            alphabetAsciiCode : {
             ascii :  {conditionalExpression:'x => x.language =="Java"',} 
         }
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.language.setValue('Java');
          userInfoFormGroup.controls.alphabetAsciiCode.setValue('中國哲學');
          expect(userInfoFormGroup.controls.alphabetAsciiCode.errors).toEqual({'ascii':{ message: 'Please enter an ascii code', refValues: [ '中國哲學' ] } });
        });

        
        it('should error in specialCharAsciiCode adding custom message in dynamic alpha validation.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            specialCharAsciiCode:{ascii:{message:'{{0}} is not an Ascii Code'}}
        }; 
        let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
        userInfoFormGroup.controls.specialCharAsciiCode.setValue('中國哲學');
        expect(userInfoFormGroup.controls.specialCharAsciiCode.errors).toEqual({'ascii':{ message: '中國哲學 is not an Ascii Code', refValues: [ '中國哲學' ] } });
        });

      });
    });
})();
import { ReactiveFormConfig,RxFormBuilder, FormBuilderConfiguration, RxFormGroup, prop } from '../../../packages/reactive-form-validators';

export class User {

	@prop()
	firstNumber: number;

	@prop()
	fifthNumber: number;

	@prop()
	thirdNumber: number;

	@prop()
	fourthNumber: number;

	@prop()
	sixthNumber: number;

}
(function() {
    describe('Dyanmic-factor-validation-decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "factor": "Enter a valid factor number.",
          }
        });
      });
  
      describe('factorDecorator', () => {
      let user = new User(); 
        it('should not error in fifthNumber based on fieldName in dynamic factor validation.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            firstNumber:{},fifthNumber:{factor:{fieldName:"firstNumber"}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.firstNumber.setValue('25');
          userInfoFormGroup.controls.fifthNumber.setValue('1');
          expect(userInfoFormGroup.controls.fifthNumber.errors).toBeNull();
        });

        it('should error in fifthNumber based on fieldName in dynamic factor validation.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            firstNumber:{},fifthNumber:{factor:{fieldName:"firstNumber"}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.firstNumber.setValue('25');
          userInfoFormGroup.controls.fifthNumber.setValue('0');
          expect(userInfoFormGroup.controls.fifthNumber.errors).toEqual({'factor':{ message: 'Enter a valid factor number.', refValues: [ '0' ] } });
        });

        
        it('should error in thirdNumber with conditional expression in dynamic factor validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            firstNumber:{},thirdNumber:{factor:{fieldName:"firstNumber",conditionalExpression:"x => x.firstNumber == 25"}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.firstNumber.setValue('25');
          userInfoFormGroup.controls.thirdNumber.setValue('0');
          expect(userInfoFormGroup.controls.thirdNumber.errors).toEqual({'factor':{ message: 'Enter a valid factor number.', refValues: [ '0' ] } });
        });

        it('should not error in thirdNumber with conditional expression in dynamic factor validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            firstNumber:{},thirdNumber:{factor:{fieldName:"firstNumber",conditionalExpression:"x => x.firstNumber == 25"}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.firstNumber.setValue('25');
          userInfoFormGroup.controls.thirdNumber.setValue('1');
          expect(userInfoFormGroup.controls.thirdNumber.errors).toBeNull();
        });

        it('should not error in thirdNumber with conditional expression in dynamic factor validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            firstNumber:{},thirdNumber:{factor:{fieldName:"firstNumber",conditionalExpression:"x => x.firstNumber == 25"}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.firstNumber.setValue('24');
          userInfoFormGroup.controls.thirdNumber.setValue('0');
          expect(userInfoFormGroup.controls.thirdNumber.errors).toBeNull();
        });
        it('should not error in fourthNumber in dynamic factor validation based on dividend.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            fourthNumber:{factor:{dividend:50}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.fourthNumber.setValue('1');
          expect(userInfoFormGroup.controls.fourthNumber.errors).toBeNull();
        });
        it('should error in fourthNumber in dynamic factor validation based on dividend.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            fourthNumber:{factor:{dividend:50}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.fourthNumber.setValue('0');
          expect(userInfoFormGroup.controls.fourthNumber.errors).toEqual({'factor':{ message: 'Enter a valid factor number.', refValues: [ '0' ] } });
        });

        it('should error in sixthNumber custom message in dynamic factor validation.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            sixthNumber:{factor:{dividend:30,message:"{{0}} is not a factor of 50"}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.sixthNumber.setValue('0');
          expect(userInfoFormGroup.controls.sixthNumber.errors).toEqual({'factor':{ message: '0 is not a factor of 50', refValues: [ '0' ] } });
        });

      })
    })
})()

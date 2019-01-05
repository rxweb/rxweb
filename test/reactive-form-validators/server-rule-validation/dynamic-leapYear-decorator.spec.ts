import { ReactiveFormConfig,RxFormBuilder, FormBuilderConfiguration, RxFormGroup, prop } from '../../../packages/reactive-form-validators';

export class User {

    @prop()
	name: string;

	@prop()
	admissionYear: Date;

	@prop()
	joiningYear: number;

}

(function() {
    describe('Dyanmic-leapYear-validation-decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
           "leapYear": "Please enter a valid leap year",
          }
        });
      });
  
      describe('leapYearDecorator', () => {
          let user = new User();
          it('should not error in admissionYear with conditional expression in dynamic leapYear validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            name:{},admissionYear:{leapYear:{conditionalExpression:"x => x.name == \"Bharat\""}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.name.setValue('Bharat');
          userInfoFormGroup.controls.admissionYear.setValue('2008');
          expect(userInfoFormGroup.controls.admissionYear.errors).toBeNull();
        });

        it('should not error in admissionYear with conditional expression in dynamic leapYear validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            name:{},admissionYear:{leapYear:{conditionalExpression:"x => x.name == \"Bharat\""}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.name.setValue('Ushmi');
          userInfoFormGroup.controls.admissionYear.setValue('2003');
          expect(userInfoFormGroup.controls.admissionYear.errors).toBeNull();
        });

        it('should error in admissionYear with conditional expression in dynamic leapYear validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            name:{},admissionYear:{leapYear:{conditionalExpression:"x => x.name == \"Bharat\""}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.name.setValue('Bharat');
          userInfoFormGroup.controls.admissionYear.setValue('2003');
          expect(userInfoFormGroup.controls.admissionYear.errors).toEqual({'leapYear':{ message: 'Please enter a valid leap year', refValues: [ '2003' ] } });
        });

        it('should error in joiningYear custom message in dynamic leapYear validation.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            joiningYear:{leapYear:{message:"{{0}} is not a leap year"}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.joiningYear.setValue('2001');
          expect(userInfoFormGroup.controls.joiningYear.errors).toEqual({'leapYear':{ message: '2001 is not a leap year', refValues: [ '2001' ] } });
        }); 

      })
    })
})();
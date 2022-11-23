import { ReactiveFormConfig,RxFormBuilder, FormBuilderConfiguration, RxFormGroup, prop } from '@rxweb/reactive-form-validators';

export class User {

	@prop()
	age: number;

	@prop()
	retiermentAge: number;

	@prop()
	voterAge: number;

	@prop()
	otherAge: number;

}
    describe('Dyanmic-greaterThan-validation-decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "greaterThan": "value should be greater than field",
          }
        });
      });
  
      describe('greaterThanDecorator', () => {
          let user = new User();
          it('should not error in retiermentAge based on fieldName in dynamic greaterThan validation.',
          () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                age:{},retiermentAge:{greaterThan:{fieldName:"age"}}
          };
            let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
            userInfoFormGroup.controls.age.setValue('25');
            userInfoFormGroup.controls.retiermentAge.setValue('26');
            expect(userInfoFormGroup.controls.retiermentAge.errors).toBeNull();
          });

          it('should error in retiermentAge based on fieldName in dynamic greaterThan validation.',
          () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                age:{},retiermentAge:{greaterThan:{fieldName:"age"}}
          };
            let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
            userInfoFormGroup.controls.age.setValue('25');
            userInfoFormGroup.controls.retiermentAge.setValue('20');
            expect(userInfoFormGroup.controls.retiermentAge.errors).toEqual({'greaterThan':{ message: 'value should be greater than field', refValues: [ '20','25' ] } });
          });
             
        it('should error in memberAge with conditional expression in dynamic greaterThan validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            age:{},voterAge:{greaterThan:{fieldName:"age",conditionalExpression:"x => x.age > 17"}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.age.setValue('25');
          userInfoFormGroup.controls.voterAge.setValue('20');
          expect(userInfoFormGroup.controls.voterAge.errors).toEqual({'greaterThan':{ message: 'value should be greater than field', refValues: [ '20','25' ] } });
        });

        it('should not error in voterAge with conditional expression in dynamic greater validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            age:{},voterAge:{greaterThan:{fieldName:"age",conditionalExpression:"x => x.age > 17"}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.age.setValue('16');
          userInfoFormGroup.controls.voterAge.setValue('20');
          expect(userInfoFormGroup.controls.voterAge.errors).toBeNull();
        });
        it('should not error in voterAge with conditional expression in dynamic greaterThan validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            age:{},voterAge:{greaterThan:{fieldName:"age",conditionalExpression:"x => x.age > 17"}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.age.setValue('18');
          userInfoFormGroup.controls.voterAge.setValue('26');
          expect(userInfoFormGroup.controls.voterAge.errors).toBeNull();
        });

        it('should error in otherAge custom message in dynamic greaterThanEqualTo validation.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
         otherAge:{greaterThan:{fieldName:"age",message:"Please enter number greater than 0."}}
        };
            let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
            userInfoFormGroup.controls.age.setValue(18);
          userInfoFormGroup.controls.otherAge.setValue(0);
          expect(userInfoFormGroup.controls.otherAge.errors).toEqual({'greaterThan':{ message: 'Please enter number greater than 0.', refValues: [ 0,18 ] } });
        });

      })
    })

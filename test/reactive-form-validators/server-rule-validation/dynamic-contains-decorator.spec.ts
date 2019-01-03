import { ReactiveFormConfig,RxFormBuilder, FormBuilderConfiguration, RxFormGroup, prop } from '../../../packages/reactive-form-validators';


export class User {

	@prop()
	emailAddress: string;

	@prop()
	recoveryEmailAddress: string;

	@prop()
	otherEmailAddress: string;

}
(function() {
    describe('Dyanmic-contains-validation-decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "contains": "input not contain string",
          }
        });
      });
      describe('conatinsDecorator', () => {
        let user = new User();         
        it("should not error in emailAddress in dynamic contains validation.",
        () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                emailAddress:{contains:{value:"@gmail.com"}}
       };
       let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
       userInfoFormGroup.controls.emailAddress.setValue('xyz@gmail.com');
      expect(userInfoFormGroup.controls.emailAddress.errors).toBeNull();
       });
      
       it("should error in emailAddress in dynamic contains validation.",
       () => {
           let formBuilderConfiguration = new FormBuilderConfiguration();
           formBuilderConfiguration.dynamicValidation = {
               emailAddress:{contains:{value:"@gmail.com"}}
      };
      let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
      userInfoFormGroup.controls.emailAddress.setValue('xyz@hotmail.com');
     expect(userInfoFormGroup.controls.emailAddress.errors).toEqual({'contains':{ message: 'input not contain string', refValues: [ 'xyz@hotmail.com','@gmail.com' ] } });
      });

      it('should not error in recoveryEmailAddress with conditional expression in dynamic contains validation with string.',
      () => {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
            emailAddress:{contains:{value:"@gmail.com"}},
            recoveryEmailAddress:{contains:{value:"@gmail.com",conditionalExpression:"x => x.emailAddress == \"abc@gmail.com\""}}
      };
        let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
        userInfoFormGroup.controls.emailAddress.setValue('abc@gmail.com');
        userInfoFormGroup.controls.recoveryEmailAddress.setValue('xyz@gmail.com');
        expect(userInfoFormGroup.controls.recoveryEmailAddress.errors).toBeNull();
      });

      it('should not error in recoveryEmailAddress with conditional expression in dynamic contains validation with string.',
      () => {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
            emailAddress:{contains:{value:"@gmail.com"}},
            recoveryEmailAddress:{contains:{value:"@gmail.com",conditionalExpression:"x => x.emailAddress == \"abc@gmail.com\""}}
      };
        let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
        userInfoFormGroup.controls.emailAddress.setValue('xyz@gmail.com');
        userInfoFormGroup.controls.recoveryEmailAddress.setValue('xyz@yahoo.com');
        expect(userInfoFormGroup.controls.recoveryEmailAddress.errors).toBeNull();
      });

      it('should error in recoveryEmailAddress with conditional expression in dynamic contains validation with string.',
      () => {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
            emailAddress:{contains:{value:"@gmail.com"}},
            recoveryEmailAddress:{contains:{value:"@gmail.com",conditionalExpression:"x => x.emailAddress == \"abc@gmail.com\""}}
      };
        let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
        userInfoFormGroup.controls.emailAddress.setValue('abc@gmail.com');
        userInfoFormGroup.controls.recoveryEmailAddress.setValue('xyz@yahoo.com');
        expect(userInfoFormGroup.controls.recoveryEmailAddress.errors).toEqual({'contains':{ message: 'input not contain string', refValues: [ 'xyz@yahoo.com','@gmail.com' ] } });
      });

      it("should error in otherEmailAddress adding custom message in dynamic contains validation.",
      () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            otherEmailAddress:{contains:{value:"@gmail.com",message:"Please enter valid gmailId"}}
        };
        let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
        userInfoFormGroup.controls.otherEmailAddress.setValue('xyz@hotmail.com')
        expect(userInfoFormGroup.controls.otherEmailAddress.errors).toEqual({'contains':{ message: 'Please enter valid gmailId', refValues: [ 'xyz@hotmail.com','@gmail.com' ] } });
        });
      });
    });
})();
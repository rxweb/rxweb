import { ReactiveFormConfig,RxFormBuilder, FormBuilderConfiguration, RxFormGroup, prop } from '@rxweb/reactive-form-validators';


export class User {

	@prop()
	email: string;

	@prop()
	businessEmailAddress: string;

	@prop()
	otherEmailAddress: string;

}   

    describe('Dyanmic-email-validation-decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "email": "Invalid email format",
          }
        });
      });   
      
      describe('emailDecorator', () => {
          let user = new User();
        it("should not error in email in dynamic email validation.",
        () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
             email:{email:true}
       };
        let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
        userInfoFormGroup.controls.email.setValue('ushmidave@gmail.com')
        expect(userInfoFormGroup.controls.email.errors).toBeNull();
       });

       it("should error in email in dynamic email validation.",
       () => {
           let formBuilderConfiguration = new FormBuilderConfiguration();
           formBuilderConfiguration.dynamicValidation = {
              email:{email:true}
      };
       let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
       userInfoFormGroup.controls.email.setValue('ushmidavegmail.com')
       expect(userInfoFormGroup.controls.email.errors).toEqual({'email':{ message: 'Invalid email format', refValues: [ 'ushmidavegmail.com' ] } });
      });

      it('should not error in businessEmailAddress with conditional expression in dynamic email validation with string.',
      () => {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
            email:{email:true},businessEmailAddress:{email:{conditionalExpression:"x => x.email ==\"abc@gmail.com\""}}
      };
        let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
        userInfoFormGroup.controls.email.setValue('abc@gmail.com');
        userInfoFormGroup.controls.businessEmailAddress.setValue('xyz@gmail.com');
        expect(userInfoFormGroup.controls.businessEmailAddress.errors).toBeNull();
      });

      it('should not error in businessEmailAddress with conditional expression in dynamic email validation with string.',
      () => {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
            email:{email:true},businessEmailAddress:{email:{conditionalExpression:"x => x.email ==\"abc@gmail.com\""}}
      };
        let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
        userInfoFormGroup.controls.email.setValue('xyz@gmail.com');
        userInfoFormGroup.controls.businessEmailAddress.setValue('xyzgmail.com');
        expect(userInfoFormGroup.controls.businessEmailAddress.errors).toBeNull();
      });

      it('should error in otherEmailAddress custom message in dynamic email validation.',
      () => {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
            otherEmailAddress:{email:{message:"Please enter valid email"}}
      };
        let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
        userInfoFormGroup.controls.otherEmailAddress.setValue('xyzgmail.com');
        expect(userInfoFormGroup.controls.otherEmailAddress.errors).toEqual({'email':{ message: 'Please enter valid email', refValues: [ 'xyzgmail.com' ] } });
      });
      })
    })

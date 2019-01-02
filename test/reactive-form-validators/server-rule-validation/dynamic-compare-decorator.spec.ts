import { ReactiveFormConfig,RxFormBuilder, FormBuilderConfiguration, RxFormGroup, prop } from '../../../packages/reactive-form-validators';

export class User {

	@prop()
	email: string;

	@prop()
	confirmEmail: string;

	@prop()
	password: string;

	@prop()
	confirmPassword: string;

}
(function() {
    describe('Dyanmic-compare-validation-decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "compare": "Both field are not matched",
          }
        });
      });
  
      describe('compareDecorator', () => {
        let user = new User();         
        it("should not error in confirmEmail in dynamic compare validation.",
        () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
            email:{},confirmEmail:{compare:{fieldName:"email"}}
       };
       let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
       userInfoFormGroup.controls.email.setValue('xyz@gmail.com');
       userInfoFormGroup.controls.confirmEmail.setValue('xyz@gmail.com')
      expect(userInfoFormGroup.controls.confirmEmail.errors).toBeNull();
     });

     it("should error in confirmEmail in dynamic compare validation.",
     () => {
         let formBuilderConfiguration = new FormBuilderConfiguration();
         formBuilderConfiguration.dynamicValidation = {
         email:{},confirmEmail:{compare:{fieldName:"email"}}
    };
    let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
    userInfoFormGroup.controls.email.setValue('xyz@gmail.com');
    userInfoFormGroup.controls.confirmEmail.setValue('abc@gmail.com')
    expect(userInfoFormGroup.controls.confirmEmail.errors).toEqual({'compare':{ message: 'Both field are not matched', refValues: [ 'abc@gmail.com','xyz@gmail.com' ] } });
   });

   it("should error in confirmPassword adding custom message in dynamic compare validation.",
   () => {
       let formBuilderConfiguration = new FormBuilderConfiguration();
       formBuilderConfiguration.dynamicValidation = {
        password:{},confirmPassword:{compare:{fieldName:"password",message:"You must enter same password"}}
     };
     let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
     userInfoFormGroup.controls.password.setValue('user@123');
     userInfoFormGroup.controls.confirmPassword.setValue('User@123')
     expect(userInfoFormGroup.controls.confirmPassword.errors).toEqual({'compare':{ message: 'You must enter same password', refValues: [ 'User@123','user@123' ] } });
      });

      })
    })
})();
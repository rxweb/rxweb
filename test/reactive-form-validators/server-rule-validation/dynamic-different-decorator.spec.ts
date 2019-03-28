import { ReactiveFormConfig,RxFormBuilder, FormBuilderConfiguration, RxFormGroup, prop } from '@rxweb/reactive-form-validators';


export class AccountInfo {

	@prop()
	firstName: string;

	@prop()
	lastName: string;

	@prop()
	middleName: string;

}

    describe('Dyanmic-different-validation-decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "different": "Do not enter same inputs.",
          }
        });
      });
  
      describe('differentDecorator', () => {
          let accountInfo = new AccountInfo();
        it("should not error in lastName in dynamic different validation.",
        () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                firstName:{},lastName:{different:{fieldName:"firstName"}}
       };
       let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(accountInfo,formBuilderConfiguration);
       userInfoFormGroup.controls.firstName.setValue('Bharat');
       userInfoFormGroup.controls.lastName.setValue('Patel')
      expect(userInfoFormGroup.controls.lastName.errors).toBeNull();
     });

     it("should error in lastName in dynamic different validation.",
     () => {
         let formBuilderConfiguration = new FormBuilderConfiguration();
         formBuilderConfiguration.dynamicValidation = {
             firstName:{},lastName:{different:{fieldName:"firstName"}}
    };
    let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(accountInfo,formBuilderConfiguration);
    userInfoFormGroup.controls.firstName.setValue('Bharat');
    userInfoFormGroup.controls.lastName.setValue('Bharat')
    expect(userInfoFormGroup.controls.lastName.errors).toEqual({'different':{ message: 'Do not enter same inputs.', refValues: [ 'Bharat','Bharat' ] } });
    });

    it("should error in middleName adding custom message in dynamic different validation.",
    () => {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
            middleName:{different:{fieldName:"firstName",message:"{{0}} is same as firstName"}}
   };
   let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(accountInfo,formBuilderConfiguration);
   userInfoFormGroup.controls.firstName.setValue('Bharat');
   userInfoFormGroup.controls.middleName.setValue('Bharat')
   expect(userInfoFormGroup.controls.middleName.errors).toEqual({'different':{ message: 'Bharat is same as firstName', refValues: [ 'Bharat','Bharat' ] } });
     });
      });
    })
  

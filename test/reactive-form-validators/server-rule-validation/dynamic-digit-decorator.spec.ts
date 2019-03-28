import { ReactiveFormConfig,RxFormBuilder, FormBuilderConfiguration, RxFormGroup, prop } from '@rxweb/reactive-form-validators';

export class User {

	@prop()
	age: number;

	@prop()
	faxNumber: number;

	@prop()
	mobileNumber: number;

}

    describe('Dyanmic-digit-validation-decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "digit": "only digits are allowed",
          }
        });
      });
  
      describe('digitDecorator', () => {
        let user = new User();        
        it("should not error in age in dynamic digit validation.",
        () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                age:{digit:true}
       };
        let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
        userInfoFormGroup.controls.age.setValue('21')
        expect(userInfoFormGroup.controls.age.errors).toBeNull();
       });

       it("should error in age in dynamic digit validation.",
       () => {
           let formBuilderConfiguration = new FormBuilderConfiguration();
           formBuilderConfiguration.dynamicValidation = {
               age:{digit:true}
      };
       let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
       userInfoFormGroup.controls.age.setValue('Ushmi')
       expect(userInfoFormGroup.controls.age.errors).toEqual({'digit':{ message: 'only digits are allowed', refValues: [ 'Ushmi' ] } });
      });

      it('should not error in faxNumber with conditional expression in dynamic digit validation with string.',
      () => {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
            age:{digit:true},
            faxNumber:{digit:{"conditionalExpression":"x => x.age >=25"}}
      };
        let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
        userInfoFormGroup.controls.age.setValue('26');
        userInfoFormGroup.controls.faxNumber.setValue('13235551234');
        expect(userInfoFormGroup.controls.faxNumber.errors).toBeNull();
      });

      it('should error in faxNumber with conditional expression in dynamic digit validation with string.',
      () => {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
            age:{digit:true},
            faxNumber:{digit:{"conditionalExpression":"x => x.age >=25"}}
      };
        let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
        userInfoFormGroup.controls.age.setValue('25');
        userInfoFormGroup.controls.faxNumber.setValue('+13235551234');
        expect(userInfoFormGroup.controls.faxNumber.errors).toEqual({'digit':{ message: 'only digits are allowed', refValues: [ '+13235551234' ] } });
      });

      it('should not error in faxNumber with conditional expression in dynamic digit validation with string.',
      () => {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
            age:{digit:true},
            faxNumber:{digit:{"conditionalExpression":"x => x.age >=25"}}
      };
        let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
        userInfoFormGroup.controls.age.setValue('19');
        userInfoFormGroup.controls.faxNumber.setValue('+13235551234');
        expect(userInfoFormGroup.controls.faxNumber.errors).toBeNull();
      });
      it("should error in mobileNumber adding custom message in dynamic digit validation.",
      () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            mobileNumber:{digit:{message:"Please enter only digit."}}
        };
        let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
        userInfoFormGroup.controls.mobileNumber.setValue('+919898125897');
        expect(userInfoFormGroup.controls.mobileNumber.errors).toEqual({'digit':{ message: 'Please enter only digit.', refValues: [ '+919898125897' ] } });
         });
      })
    })

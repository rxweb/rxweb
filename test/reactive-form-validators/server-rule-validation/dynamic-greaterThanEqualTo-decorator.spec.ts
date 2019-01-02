import { ReactiveFormConfig,RxFormBuilder, FormBuilderConfiguration, RxFormGroup, prop } from '../../../packages/reactive-form-validators';


export class User {

	@prop()
	admissionAge: number;

	@prop()
	retiermentAge: number;

	@prop()
	memberAge: number;

	@prop()
	otherAge: number;

}

(function() {
    describe('Dyanmic-greaterThanEqualTo-validation-decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "greaterThanEqualTo": "value should be greater than equal to field",
          }
        });
      });
  
      describe('greaterThanEqualToDecorator', () => {
        let user = new User(); 
        it('should not error in retiermentAge based on fieldName in dynamic greaterThanEqualTo validation.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            admissionAge:{},retiermentAge:{greaterThanEqualTo:{fieldName:"admissionAge"}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.admissionAge.setValue('25');
          userInfoFormGroup.controls.retiermentAge.setValue('25');
          expect(userInfoFormGroup.controls.retiermentAge.errors).toBeNull();
        });

        it('should error in retiermentAge based on fieldName in dynamic greaterThanEqualTo validation.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            admissionAge:{},retiermentAge:{greaterThanEqualTo:{fieldName:"admissionAge"}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.admissionAge.setValue('25');
          userInfoFormGroup.controls.retiermentAge.setValue('20');
          expect(userInfoFormGroup.controls.retiermentAge.errors).toEqual({'greaterThanEqualTo':{ message: 'value should be greater than equal to field', refValues: [ '20','25' ] } });
        });

         
        it('should error in memberAge with conditional expression in dynamic greaterThanEqualTo validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            admissionAge:{}, memberAge:{greaterThanEqualTo:{fieldName:"admissionAge",conditionalExpression:"x => x.admissionAge >= 18 "}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.admissionAge.setValue('25');
          userInfoFormGroup.controls.memberAge.setValue('20');
          expect(userInfoFormGroup.controls.memberAge.errors).toEqual({'greaterThanEqualTo':{ message: 'value should be greater than equal to field', refValues: [ '20','25' ] } });
        });
        
        it('should not error in memberAge with conditional expression in dynamic greaterThanEqualTo validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            admissionAge:{}, memberAge:{greaterThanEqualTo:{fieldName:"admissionAge",conditionalExpression:"x => x.admissionAge >= 18 "}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.admissionAge.setValue('25');
          userInfoFormGroup.controls.memberAge.setValue('25');
          expect(userInfoFormGroup.controls.memberAge.errors).toBeNull();
        });

        it('should not error in memberAge with conditional expression in dynamic greaterThanEqualTo validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            admissionAge:{}, memberAge:{greaterThanEqualTo:{fieldName:"admissionAge",conditionalExpression:"x => x.admissionAge >= 18 "}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.admissionAge.setValue('10');
          userInfoFormGroup.controls.memberAge.setValue('9');
          expect(userInfoFormGroup.controls.memberAge.errors).toBeNull();
        });

        it('should error in otherAge custom message in dynamic greaterThanEqualTo validation.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            otherAge:{greaterThanEqualTo:{fieldName:"admissionAge",message:"Please enter number greater than or equal to 1."}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.otherAge.setValue('0');
          expect(userInfoFormGroup.controls.otherAge.errors).toEqual({'greaterThanEqualTo':{ message: 'Please enter number greater than or equal to 1.', refValues: [ '0','10' ] } });
        });

      });
    });
})()
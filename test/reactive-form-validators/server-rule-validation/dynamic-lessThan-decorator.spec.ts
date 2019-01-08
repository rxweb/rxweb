import { ReactiveFormConfig,RxFormBuilder, FormBuilderConfiguration, RxFormGroup, prop } from '../../../packages/reactive-form-validators';

export class User {

	@prop()
	obtainedMarks: number;

	@prop()
	otherActivityMarks: number;

	@prop()
	passingMarks: number;

	@prop()
	otherMarks: number;

}

(function() {
    describe('Dyanmic-lessThan-validation-decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "lessThan": "value should be less than field",
          }
        });
      });
  
      describe('lessThanDecorator', () => {
          let user = new User();
          it('should not error in otherActivityMarks based on fieldName in dynamic lessThan validation.',
          () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                obtainedMarks:{},otherActivityMarks:{lessThan:{fieldName:"obtainedMarks"}}
          };
            let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
            userInfoFormGroup.controls.obtainedMarks.setValue('25');
            userInfoFormGroup.controls.otherActivityMarks.setValue('22');
            expect(userInfoFormGroup.controls.otherActivityMarks.errors).toBeNull();
          });

          it('should error in otherActivityMarks based on fieldName in dynamic lessThan validation.',
          () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                obtainedMarks:{},otherActivityMarks:{lessThan:{fieldName:"obtainedMarks"}}
           };
            let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
            userInfoFormGroup.controls.obtainedMarks.setValue('25');
            userInfoFormGroup.controls.otherActivityMarks.setValue('26');
            expect(userInfoFormGroup.controls.otherActivityMarks.errors).toEqual({'lessThan':{ message: 'value should be less than field', refValues: [ '26','25' ] } });
          });

          it('should error in memberAge with conditional expression in dynamic lessThan validation with string.',
          () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                obtainedMarks:{},passingMarks:{lessThan:{fieldName:"obtainedMarks",conditionalExpression:"x => x.obtainedMarks < 35"}}
          };
            let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
            userInfoFormGroup.controls.obtainedMarks.setValue('25');
            userInfoFormGroup.controls.passingMarks.setValue('30');
            expect(userInfoFormGroup.controls.passingMarks.errors).toEqual({'lessThan':{ message: 'value should be less than field', refValues: [ '30','25' ] } });
          });

          it('should not error in memberAge with conditional expression in dynamic lessThan validation with string.',
          () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                obtainedMarks:{},passingMarks:{lessThan:{fieldName:"obtainedMarks",conditionalExpression:"x => x.obtainedMarks < 35"}}
          };
            let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
            userInfoFormGroup.controls.obtainedMarks.setValue('25');
            userInfoFormGroup.controls.passingMarks.setValue('20');
            expect(userInfoFormGroup.controls.passingMarks.errors).toBeNull();
          });

          
          it('should not error in memberAge with conditional expression in dynamic lessThan validation with string.',
          () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                obtainedMarks:{},passingMarks:{lessThan:{fieldName:"obtainedMarks",conditionalExpression:"x => x.obtainedMarks < 35"}}
          };
            let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
            userInfoFormGroup.controls.obtainedMarks.setValue('40');
            userInfoFormGroup.controls.passingMarks.setValue('45');
            expect(userInfoFormGroup.controls.passingMarks.errors).toBeNull();
          });

          it('should error in otherMarks custom message in dynamic lessThan validation.',
          () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                obtainedMarks:{},otherMarks:{lessThan:{fieldName:"obtainedMarks",message:"Please enter number greater than 100."}}
          };
            let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
            userInfoFormGroup.controls.obtainedMarks.setValue('100')
            userInfoFormGroup.controls.otherMarks.setValue('105');
            expect(userInfoFormGroup.controls.otherMarks.errors).toEqual({'lessThan':{ message: 'Please enter number greater than 100.', refValues: [ '105','100' ] } });
          }); 

      });
    });
})();
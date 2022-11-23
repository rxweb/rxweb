import { ReactiveFormConfig,RxFormBuilder, FormBuilderConfiguration, RxFormGroup, prop } from '../../../packages/reactive-form-validators';

export class User {

	@prop()
	totalMarks: number;

	@prop()
	passingMarks: number;

	@prop()
	practicalExamMarks: number;

	@prop()
	otherMarks: number;

}

    describe('Dyanmic-lessThanEqualTo-validation-decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "lessThanEqualTo": "value should be less than equal to field",
          }
        });
      });
  
      describe('lessThanEqualToDecorator', () => {
        let user = new User();
        it('should not error in otherActivityMarks based on fieldName in dynamic lessThanEqualTo validation.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            totalMarks:{},passingMarks:{lessThanEqualTo:{fieldName:"totalMarks"}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.totalMarks.setValue('25');
          userInfoFormGroup.controls.passingMarks.setValue('22');
          expect(userInfoFormGroup.controls.passingMarks.errors).toBeNull();
        });

        it('should error in otherActivityMarks based on fieldName in dynamic lessThanEqualTo validation.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            totalMarks:{},passingMarks:{lessThanEqualTo:{fieldName:"totalMarks"}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.totalMarks.setValue('25');
          userInfoFormGroup.controls.passingMarks.setValue('26');
          expect(userInfoFormGroup.controls.passingMarks.errors).toEqual({'lessThanEqualTo':{ message: 'value should be less than equal to field', refValues: [ '26','25' ] } });
        });

        it('should error in memberAge with conditional expression in dynamic lessThanEqualTo validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            totalMarks:{}, practicalExamMarks:{lessThanEqualTo:{fieldName:"totalMarks",conditionalExpression:"x => x.totalMarks == 100"}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.totalMarks.setValue('100');
          userInfoFormGroup.controls.practicalExamMarks.setValue('105');
          expect(userInfoFormGroup.controls.practicalExamMarks.errors).toEqual({'lessThanEqualTo':{ message: 'value should be less than equal to field', refValues: [ '105','100' ] } });
        });

        it('should not error in memberAge with conditional expression in dynamic lessThanEqualTo validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            totalMarks:{}, practicalExamMarks:{lessThanEqualTo:{fieldName:"totalMarks",conditionalExpression:"x => x.totalMarks == 100"}}
        };  
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.totalMarks.setValue('100');
          userInfoFormGroup.controls.practicalExamMarks.setValue('90');
          expect(userInfoFormGroup.controls.practicalExamMarks.errors).toBeNull();
        });

        
        it('should not error in memberAge with conditional expression in dynamic lessThanEqualTo validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            totalMarks:{}, practicalExamMarks:{lessThanEqualTo:{fieldName:"totalMarks",conditionalExpression:"x => x.totalMarks == 100"}}
        };  
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.totalMarks.setValue('99');
          userInfoFormGroup.controls.practicalExamMarks.setValue('105');
          expect(userInfoFormGroup.controls.practicalExamMarks.errors).toBeNull();
        });

        
        it('should error in otherMarks custom message in dynamic lessThanEqualTo validation.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            totalMarks:{},otherMarks:{lessThanEqualTo:{fieldName:"totalMarks",message:"Please enter number less than 100."}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.totalMarks.setValue('100')
          userInfoFormGroup.controls.otherMarks.setValue('105');
          expect(userInfoFormGroup.controls.otherMarks.errors).toEqual({'lessThanEqualTo':{ message: 'Please enter number less than 100.', refValues: [ '105','100' ] } });
        });

      })
    })

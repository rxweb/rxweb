import { ReactiveFormConfig,RxFormBuilder, FormBuilderConfiguration, RxFormGroup, prop } from '../../../packages/reactive-form-validators';


export class User {

	@prop()
	type: string;

	@prop()
	evenNumber: number;

	@prop()
	multiplesOfEvenNumber: number;

}


(function() {
    describe('Dyanmic-even-validation-decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "even": "Enter a valid even number.",
          }
        });
      });
  
      describe('evenDecorator', () => {
        let user = new User();
        it('should not error in evenNumber with conditional expression in dynamic even validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            type:{},evenNumber:{even:{conditionalExpression:"x => x.type == \"Even\""}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.type.setValue('Even');
          userInfoFormGroup.controls.evenNumber.setValue('2');
          expect(userInfoFormGroup.controls.evenNumber.errors).toBeNull();
        });

        it('should not error in evenNumber with conditional expression in dynamic even validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            type:{},evenNumber:{even:{conditionalExpression:"x => x.type == \"Even\""}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.type.setValue('Odd');
          userInfoFormGroup.controls.evenNumber.setValue('3');
          expect(userInfoFormGroup.controls.evenNumber.errors).toBeNull();
        });

        it('should error in evenNumber with conditional expression in dynamic even validation with string.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            type:{},evenNumber:{even:{conditionalExpression:"x => x.type == \"Even\""}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.type.setValue('Even');
          userInfoFormGroup.controls.evenNumber.setValue('3');
          expect(userInfoFormGroup.controls.evenNumber.errors).toEqual({'even':{ message: 'Enter a valid even number.', refValues: [ '3' ] } });
        });
        it('should error in multiplesOfEvenNumber custom message in dynamic even validation.',
        () => {
          let formBuilderConfiguration = new FormBuilderConfiguration();
          formBuilderConfiguration.dynamicValidation = {
            multiplesOfEvenNumber:{even:{message:"{{0}} is not an even number"}}
        };
          let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
          userInfoFormGroup.controls.multiplesOfEvenNumber.setValue('9');
          expect(userInfoFormGroup.controls.multiplesOfEvenNumber.errors).toEqual({'even':{ message: '9 is not an even number', refValues: [ '9' ] } });
        });

      })
    })
})();
import { ReactiveFormConfig,RxFormBuilder, FormBuilderConfiguration, RxFormGroup, prop } from '@rxweb/reactive-form-validators';

export class User {

	@prop()
	name: string;

	@prop()
	taskId: string;

	@prop()
	company: string;

}

    describe('Dyanmic-ends-with-validation-decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "endsWith": "Input must ends with a pre defined value",
          }
        });
      });
  
      describe('endsWithDecorator', () => {
        let user = new User();
        it("should not error in name in dynamic endsWith validation.",
        () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                name:{endsWith:{value:"t"}}
       };
        let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
        userInfoFormGroup.controls.name.setValue('Bharat')
        expect(userInfoFormGroup.controls.name.errors).toBeNull();
       });

       it("should error in name in dynamic endsWith validation.",
        () => {
            let formBuilderConfiguration = new FormBuilderConfiguration();
            formBuilderConfiguration.dynamicValidation = {
                name:{endsWith:{value:"t"}}
       };
        let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
        userInfoFormGroup.controls.name.setValue('Ushmi')
        expect(userInfoFormGroup.controls.name.errors).toEqual({'endsWith':{ message: 'Input must ends with a pre defined value', refValues: [ 'Ushmi','t' ] } });
       });

       it('should not error in taskId with conditional expression in dynamic endsWith validation with string.',
       () => {
         let formBuilderConfiguration = new FormBuilderConfiguration();
         formBuilderConfiguration.dynamicValidation = {
            name:{endsWith:{value:"t"}},taskId:{endsWith:{value:"1",conditionalExpression:"x => x.name ==\"Bharat\""}}
       };
         let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
         userInfoFormGroup.controls.name.setValue('Bharat');
         userInfoFormGroup.controls.taskId.setValue('311');
         expect(userInfoFormGroup.controls.taskId.errors).toBeNull();
       });

       it('should not error in taskId with conditional expression in dynamic endsWith validation with string.',
       () => {
         let formBuilderConfiguration = new FormBuilderConfiguration();
         formBuilderConfiguration.dynamicValidation = {
            name:{endsWith:{value:"t"}},taskId:{endsWith:{value:"1",conditionalExpression:"x => x.name ==\"Bharat\""}}
       };
         let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
         userInfoFormGroup.controls.name.setValue('Ushmi');
         userInfoFormGroup.controls.taskId.setValue('123');
         expect(userInfoFormGroup.controls.taskId.errors).toBeNull();
       });

       it('should not error in taskId with conditional expression in dynamic endsWith validation with string.',
       () => {
         let formBuilderConfiguration = new FormBuilderConfiguration();
         formBuilderConfiguration.dynamicValidation = {
            name:{endsWith:{value:"t"}},taskId:{endsWith:{value:"1",conditionalExpression:"x => x.name ==\"Bharat\""}}
         };
         let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
         userInfoFormGroup.controls.name.setValue('Bharat');
         userInfoFormGroup.controls.taskId.setValue('123');
         expect(userInfoFormGroup.controls.taskId.errors).toEqual({'endsWith':{ message: 'Input must ends with a pre defined value', refValues: [ '123','1' ] } });
       });

       it('should error in company custom message in dynamic email validation.',
       () => {
         let formBuilderConfiguration = new FormBuilderConfiguration();
         formBuilderConfiguration.dynamicValidation = {
            company:{endsWith:{value:"b",message:"{{0}} does not ends with `b`"}}
       };
         let userInfoFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
         userInfoFormGroup.controls.company.setValue('microsoft');
         expect(userInfoFormGroup.controls.company.errors).toEqual({'endsWith':{ message: 'microsoft does not ends with `b`', refValues: [ 'microsoft','b' ] } });
       });

      })
    });

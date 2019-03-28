import { prop, ReactiveFormConfig, RxFormBuilder, FormBuilderConfiguration, RxFormGroup } from '@rxweb/reactive-form-validators';

export class User {

	@prop()
	firstName: string;

	@prop()
	lastName: string;

	@prop()
	userName: string;

}


    describe('Dynamic Validation decorator', () => {
        let formBuilder = new RxFormBuilder();
        beforeEach(() => {
            ReactiveFormConfig.set({
                "validationMessage": {
                    "required": "This field is required",
                }
            });
        });

        describe('required dynamic validation', () => {

            let user = new User();

            it('should not error in firstName adding dynamic required validation',
            () => {
                let formBuilderConfiguration = new FormBuilderConfiguration();
                formBuilderConfiguration.dynamicValidation = {
                    firstName: {
                        required: true
                    }
                };
                let userFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
                userFormGroup.controls.firstName.setValue('Bharat');
                expect(userFormGroup.controls.firstName.errors).toBeNull();
            });

            it('should error in firstName adding dynamic required validation',
            () => {
                let formBuilderConfiguration = new FormBuilderConfiguration();
                formBuilderConfiguration.dynamicValidation = {
                    firstName: {
                        required: true
                    }
                };
                let userFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
                userFormGroup.controls.firstName.setValue('');
                expect(userFormGroup.controls.firstName.errors).toEqual({'required':{ message: 'This field is required', refValues: [ ] } });
            });

            it('should not error in lastName with conditional expression in dynamic required validation with string.',
            () =>{
                let formBuilderConfiguration = new FormBuilderConfiguration();
                formBuilderConfiguration.dynamicValidation = {
                    firstName : {
                        required : true  
                    },
                    lastName : {
                        required :  {conditionalExpression:'x => x.firstName == "Bharat"',} 
                    }
                }
                let userFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
                userFormGroup.controls.firstName.setValue('Bharat'); 
                userFormGroup.controls.lastName.setValue('Patel');
                expect(userFormGroup.controls.lastName.errors).toBeNull();
            });

            it('should not error in lastName with conditional expression in dynamic required validation with string.',
            () =>{
                let formBuilderConfiguration = new FormBuilderConfiguration();
                formBuilderConfiguration.dynamicValidation = {
                    firstName : {
                        required : true  
                    },
                    lastName : {
                        required :  {conditionalExpression:'x => x.firstName == "Bharat"',} 
                    }
                }
                let userFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
                userFormGroup.controls.firstName.setValue('Srishti'); 
                userFormGroup.controls.lastName.setValue('');
                expect(userFormGroup.controls.lastName.errors).toBeNull();
            });

            it('should error in lastName with conditional expression in dynamic required validation with string.',
            () =>{
                let formBuilderConfiguration = new FormBuilderConfiguration();
                formBuilderConfiguration.dynamicValidation = {
                    firstName : {
                        required : true  
                    },
                    lastName : {
                        required :  {conditionalExpression:'x => x.firstName == "Bharat"',} 
                    }
                }
                let userFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
                userFormGroup.controls.firstName.setValue('Bharat'); 
                userFormGroup.controls.lastName.setValue('');
                expect(userFormGroup.controls.lastName.errors).toEqual({'required':{ message: 'This field is required', refValues: [ ] } });
            });

            it('should error in userName adding custom message in dynamic required validation.',
            () =>{
                let formBuilderConfiguration = new FormBuilderConfiguration();
                formBuilderConfiguration.dynamicValidation = {
                    userName : {
                        required :  {message:'Username cannot be blank.',} 
                    }
                }
                let userFormGroup = <RxFormGroup>formBuilder.formGroup(user,formBuilderConfiguration);
                userFormGroup.controls.userName.setValue('');
                expect(userFormGroup.controls.userName.errors).toEqual({'required':{ message: 'Username cannot be blank.', refValues: [ ] } });
            });
 
            //end
        });
    });

import { required, ReactiveFormConfig,RxFormBuilder } from '@rxweb/reactive-form-validators';

export class User {

	@required() 
	firstName: string;

	//If you want to apply conditional expression of type 'function'
	@required({conditionalExpression:(x,y) => x.firstName == "Bharat"  }) 
	middleName: string;

	//If you want to apply conditional expression of type 'string'
	@required({conditionalExpression:'x => x.firstName == "Bharat"' }) 
	lastName: string;

	@required({message:'Username cannot be blank.' }) 
	userName: string;

}

  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "required": "This field is required",
        }
      });
    });

    describe('requiredDecorator', () => {

	    it('firstName value should be "Bharat".',
        () => {
        let user = new User();
        user.firstName = 'Bharat';
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.firstName.value).toEqual('Bharat');
     });

	 it("Should error, required decorator If you want to apply conditional validation on 'Middle Name' or 'Last Name', then you need to add 'First Name' input as 'Bharat'",
        () => {
		let user = new User();
        let formGroup = formBuilder.formGroup(user);
		formGroup.controls.firstName.setValue('');
        expect(formGroup.controls.firstName.errors).toEqual({'required':{ message: 'This field is required', refValues: [  ] } });
     });


    it("Should not error, required decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.firstName = 'Bharat';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.middleName.setValue('Raj');
        expect(formGroup.controls.middleName.errors).toBeNull();
     });

    it('middleName value should be "Raj".',
        () => {
        let user = new User();
        user.middleName = 'Raj';
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.middleName.value).toEqual('Raj');
     });
    it("Should not error, required decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.firstName = 'Mukesh';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.middleName.setValue('');
        expect(formGroup.controls.middleName.errors).toBeNull();
     });



    it("Should error, required decorator Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.firstName = 'Bharat';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.middleName.setValue('');
        expect(formGroup.controls.middleName.errors).toEqual({'required':{ message: 'This field is required', refValues: [  ] } });
     });


    it("Should not error, required decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.firstName = 'Bharat';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.lastName.setValue('Shah');
        expect(formGroup.controls.lastName.errors).toBeNull();
     });

    it('lastName value should be "Shah".',
        () => {
        let user = new User();
        user.lastName = 'Shah';
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.lastName.value).toEqual('Shah');
     });
    it("Should not error, required decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.firstName = 'Mukesh';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.lastName.setValue('');
        expect(formGroup.controls.lastName.errors).toBeNull();
     });



    it("Should error, required decorator Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.firstName = 'Bharat';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.lastName.setValue('');
        expect(formGroup.controls.lastName.errors).toEqual({'required':{ message: 'This field is required', refValues: [  ] } });
     });



	 it("Should error, required decorator Shows Custom Validation Message.",
        () => {
		let user = new User();
        let formGroup = formBuilder.formGroup(user);
		formGroup.controls.userName.setValue('');
        expect(formGroup.controls.userName.errors).toEqual({'required':{ message: 'Username cannot be blank.', refValues: [  ] } });
     });



	//end
    });
  });

import { maxLength, ReactiveFormConfig,RxFormBuilder } from '@rxweb/reactive-form-validators';

export class User {

	@maxLength({value:16 }) 
	firstName: string;

	//If you want to apply conditional expression of type 'function'
	@maxLength({value:16  ,conditionalExpression:(x,y)=> x.firstName == "Bharat" }) 
	middleName: string;

	//If you want to apply conditional expression of type 'string'
	@maxLength({value:16  ,conditionalExpression:'x => x.firstName == "Bharat"' }) 
	lastName: string;

	//Shows custom message
	@maxLength({value:10  ,message:'Maximum 10 characters are allowed' }) 
	userName: string;

}




  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "maxLength": "Maximum Length is not matched",
        }
      });
    });

    describe('maxLengthDecorator', () => {

	
	 it("Should not error, maxLength decorator  If you want to apply conditional validation on 'Middle Name' or 'Last name', then you need to add 'First Name' input as 'Bharat'",
        () => {
		let user = new User();
        user.firstName = undefined;
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.firstName.errors).toBeNull();
     });

    it('firstName value should be "Bharat".',
        () => {
        let user = new User();
        user.firstName = 'Bharat';
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.firstName.value).toEqual('Bharat');
     });

	 it("Should error, maxLength decorator If you want to apply conditional validation on 'Middle Name' or 'Last name', then you need to add 'First Name' input as 'Bharat'",
        () => {
		let user = new User();
        let formGroup = formBuilder.formGroup(user);
		formGroup.controls.firstName.setValue('SamanthaRuthPrabhu');
        expect(formGroup.controls.firstName.errors).toEqual({'maxLength':{ message: 'Maximum Length is not matched', refValues: [ 'SamanthaRuthPrabhu',16 ] } });
     });


    it("Should not error, maxLength decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.firstName = 'Bharat';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.middleName.setValue('Bharat');
        expect(formGroup.controls.middleName.errors).toBeNull();
     });

    it('middleName value should be "Bharat".',
        () => {
        let user = new User();
        user.middleName = 'Bharat';
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.middleName.value).toEqual('Bharat');
     });
    it("Should not error, maxLength decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.firstName = 'Mahesh';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.middleName.setValue('AtharintikiDaaredi');
        expect(formGroup.controls.middleName.errors).toBeNull();
     });



    it("Should error, maxLength decorator Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.firstName = 'Bharat';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.middleName.setValue('AtharintikiDaaredi');
        expect(formGroup.controls.middleName.errors).toEqual({'maxLength':{ message: 'Maximum Length is not matched', refValues: [ 'AtharintikiDaaredi',16 ] } });
     });


    it("Should not error, maxLength decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.firstName = 'Bharat';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.lastName.setValue('Bharat');
        expect(formGroup.controls.lastName.errors).toBeNull();
     });

    it('lastName value should be "Bharat".',
        () => {
        let user = new User();
        user.lastName = 'Bharat';
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.lastName.value).toEqual('Bharat');
     });
    it("Should not error, maxLength decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.firstName = 'Mahesh';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.lastName.setValue('AtharintikiDaaredi');
        expect(formGroup.controls.lastName.errors).toBeNull();
     });



    it("Should error, maxLength decorator Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.firstName = 'Bharat';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.lastName.setValue('AtharintikiDaaredi');
        expect(formGroup.controls.lastName.errors).toEqual({'maxLength':{ message: 'Maximum Length is not matched', refValues: [ 'AtharintikiDaaredi',16 ] } });
     });



	//end
    });
  });

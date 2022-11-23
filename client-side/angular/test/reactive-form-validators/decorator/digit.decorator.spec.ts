import { digit, ReactiveFormConfig,RxFormBuilder } from '@rxweb/reactive-form-validators';

export class User {

	@digit() 
	age: number;

	//If you want to apply conditional expression of type 'function'
	@digit({conditionalExpression:(x,y) => x.age >= 25  }) 
	phoneNumber: number;

	//If you want to apply conditional expression of type 'string'
	@digit({conditionalExpression:'x => x.age >=25' }) 
	faxNumber: number;

	@digit({message:'Please enter only digit.' }) 
	mobileNumber: number;

}

describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "digit": "only digits are allowed",
        }
      });
    });

    describe('digitDecorator', () => {

	
	  it('should not error in countryName property with null value.',
        () => {
        let formGroup = formBuilder.formGroup(User);
        expect(formGroup.controls.age.errors).toBeNull();
     });

	 it('should not error in countryName property with null value.',
        () => {
		let user = new User();
        user.age = undefined;
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.age.errors).toBeNull();
     });

    it("Should not error, digit decorator  If you want to apply conditional expression of type 'function'",
        () => {
		let user = new User();
		user.age = 25;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.phoneNumber.setValue(9898164093);
        expect(formGroup.controls.phoneNumber.errors).toBeNull();
     });

    it('phoneNumber value should be "9898164093".',
        () => {
        let user = new User();
        user.phoneNumber = 9898164093;
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.phoneNumber.value).toEqual(9898164093);
     });
    it("Should not error, digit decorator  If you want to apply conditional expression of type 'function'",
        () => {
		let user = new User();
		user.age = 21;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.phoneNumber.setValue(919898164093);
        expect(formGroup.controls.phoneNumber.errors).toBeNull();
     });



    it("Should error, digit decorator If you want to apply conditional expression of type 'function'",
        () => {
		let user = new User();
		user.age = 25;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.phoneNumber.setValue('91-9898164093');
        expect(formGroup.controls.phoneNumber.errors).toEqual({'digit':{ message: 'only digits are allowed', refValues: [ '91-9898164093' ] } });
     });


    it("Should not error, digit decorator  If you want to apply conditional expression of type 'string'",
        () => {
		let user = new User();
		user.age = 25;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.faxNumber.setValue(442081234567);
        expect(formGroup.controls.faxNumber.errors).toBeNull();
     });

    it('faxNumber value should be "442081234567".',
        () => {
        let user = new User();
        user.faxNumber = 442081234567;
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.faxNumber.value).toEqual(442081234567);
     });
    it("Should not error, digit decorator  If you want to apply conditional expression of type 'string'",
        () => {
		let user = new User();
		user.age = 21;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.faxNumber.setValue(442081234567);
        expect(formGroup.controls.faxNumber.errors).toBeNull();
     });



    it("Should error, digit decorator If you want to apply conditional expression of type 'string'",
        () => {
		let user = new User();
		user.age = 25;
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.faxNumber.setValue('44-2081234567');
        expect(formGroup.controls.faxNumber.errors).toEqual({'digit':{ message: 'only digits are allowed', refValues: [ '44-2081234567' ] } });
     });



	 it("Should error, digit decorator Shows custom message",
        () => {
		let user = new User();
        let formGroup = formBuilder.formGroup(user);
		formGroup.controls.mobileNumber.setValue('91-9898164093');
        expect(formGroup.controls.mobileNumber.errors).toEqual({'digit':{ message: 'Please enter only digit.', refValues: [ '91-9898164093' ] } });
     });



	//end
    });
  });

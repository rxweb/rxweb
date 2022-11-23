import { lowerCase, ReactiveFormConfig,RxFormBuilder } from '@rxweb/reactive-form-validators';

export class User {

	@lowerCase() 
	username: string;

	//If you want to apply conditional expression of type 'function'
	@lowerCase({conditionalExpression:(x,y) =>  x.username == "jonathan.feldman"  }) 
	firstName: string;

	//If you want to apply conditional expression of type 'string'
	@lowerCase({conditionalExpression:'x => x.username == "jonathan.feldman"' }) 
	middleName: string;

	//Shows custom message
	@lowerCase({message:'You can enter only lowerCase letters.' }) 
	lastName: string;

}




  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "lowerCase": "Only lower case are allowed.",
        }
      });
    });

    describe('lowerCaseDecorator', () => {

	
	  it('should not error in countryName property with null value.',
        () => {
        let formGroup = formBuilder.formGroup(User);
        expect(formGroup.controls.username.errors).toBeNull();
     });

	 it('should not error in countryName property with null value.',
        () => {
		let user = new User();
        user.username = undefined;
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.username.errors).toBeNull();
     });

    it("Should not error, lowerCase decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.username = 'jonathan.feldman';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.firstName.setValue('bharat');
        expect(formGroup.controls.firstName.errors).toBeNull();
     });

    it('firstName value should be "bharat".',
        () => {
        let user = new User();
        user.firstName = 'bharat';
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.firstName.value).toEqual('bharat');
     });
    it("Should not error, lowerCase decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.username = 'bharat.patel';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.firstName.setValue('BHARAT');
        expect(formGroup.controls.firstName.errors).toBeNull();
     });



    it("Should error, lowerCase decorator Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.username = 'jonathan.feldman';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.firstName.setValue('BHARAT');
        expect(formGroup.controls.firstName.errors).toEqual({'lowerCase':{ message: 'Only lower case are allowed.', refValues: [ 'BHARAT' ] } });
     });


    it("Should not error, lowerCase decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.username = 'jonathan.feldman';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.middleName.setValue('bharat');
        expect(formGroup.controls.middleName.errors).toBeNull();
     });

    it('middleName value should be "bharat".',
        () => {
        let user = new User();
        user.middleName = 'bharat';
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.middleName.value).toEqual('bharat');
     });
    it("Should not error, lowerCase decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.username = 'bharat.patel';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.middleName.setValue('BHARAT');
        expect(formGroup.controls.middleName.errors).toBeNull();
     });



    it("Should error, lowerCase decorator Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.username = 'jonathan.feldman';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.middleName.setValue('BHARAT');
        expect(formGroup.controls.middleName.errors).toEqual({'lowerCase':{ message: 'Only lower case are allowed.', refValues: [ 'BHARAT' ] } });
     });



	 it("Should error, lowerCase decorator ",
        () => {
		let user = new User();
        let formGroup = formBuilder.formGroup(user);
		formGroup.controls.lastName.setValue('BHARAT');
        expect(formGroup.controls.lastName.errors).toEqual({'lowerCase':{ message: 'You can enter only lowerCase letters.', refValues: [ 'BHARAT' ] } });
     });



	//end
    });
  });

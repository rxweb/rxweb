import { different, prop, ReactiveFormConfig, RxFormBuilder } from '@rxweb/reactive-form-validators';

export class AccountInfo {

	@prop()
	firstName: string;

	@different({fieldName:'firstName' }) 
	lastName: string;

	@different({fieldName:'firstName'  ,message:'{{0}} is same as firstName' }) 
	middleName: string;

}




  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "different": "Do not enter same inputs.",
        }
      });
    });

    describe('differentDecorator', () => {

	
    it("Should not error, different decorator  Last Name and First Name must be different",
        () => {
		let accountInfo = new AccountInfo();
		accountInfo.firstName = 'Mukesh';
        let formGroup = formBuilder.formGroup(accountInfo);
        formGroup.controls.lastName.setValue('Bharat');
        expect(formGroup.controls.lastName.errors).toBeNull();
     });

    it('lastName value should be "Bharat".',
        () => {
        let accountInfo = new AccountInfo();
        accountInfo.lastName = 'Bharat';
        let formGroup = formBuilder.formGroup(accountInfo);
        expect(formGroup.controls.lastName.value).toEqual('Bharat');
     });

    it("Should error, different decorator Last Name and First Name must be different",
        () => {
		let accountInfo = new AccountInfo();
		accountInfo.firstName = 'Shah';
        let formGroup = formBuilder.formGroup(accountInfo);
        formGroup.controls.lastName.setValue('Shah');
        expect(formGroup.controls.lastName.errors).toEqual({'different':{ message: 'Do not enter same inputs.', refValues: [ 'Shah','Shah' ] } });
     });



    it("Should error, different decorator Shows custom message.",
        () => {
		let accountInfo = new AccountInfo();
		accountInfo.firstName = 'Mukesh';
        let formGroup = formBuilder.formGroup(accountInfo);
        formGroup.controls.middleName.setValue('Mukesh');
        expect(formGroup.controls.middleName.errors).toEqual({'different':{ message: 'Mukesh is same as firstName', refValues: [ 'Mukesh','Mukesh' ] } });
     });



	//end
    });
  });

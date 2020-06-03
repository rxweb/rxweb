import { requiredTrue, ReactiveFormConfig,RxFormBuilder } from '@rxweb/reactive-form-validators';

export class User {

	@requiredTrue() 
	isChecked: boolean;
}

  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "requiredTrue": "This field is required",
        }
      });
    });

    describe('requiredDecorator', () => {

	    it('isChecked contains the value of false',
        () => {
            let user = new User();
            user.isChecked = false;
        let formGroup = formBuilder.formGroup(user);
            expect(formGroup.controls.isChecked.value).toEqual(false);
     });

	 it("Should error with false value",
        () => {
		let user = new User();
        let formGroup = formBuilder.formGroup(user);
            formGroup.controls.isChecked.setValue(false);
            expect(formGroup.controls.isChecked.errors).toEqual({'requiredTrue':{ message: 'This field is required', refValues: [ ] } });
     });

        it("Should error with null value",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.isChecked.setValue(null);
                expect(formGroup.controls.isChecked.errors).toEqual({ 'requiredTrue': { message: 'This field is required', refValues: [] } });
            });

        it("Should not error with true value",
            () => {
                let user = new User();
                let formGroup = formBuilder.formGroup(user);
                formGroup.controls.isChecked.setValue(true);
                expect(formGroup.controls.isChecked.errors).toBeNull();
            });



	//end
    });
  });

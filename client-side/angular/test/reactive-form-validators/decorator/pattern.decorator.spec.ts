import { pattern, ReactiveFormConfig,RxFormBuilder } from '../../../packages/reactive-form-validators';


export class User {

	@pattern({expression:{'onlyAlpha': RegExp(/^[A-Za-z]+$/)} }) 
	userName: string;

	@pattern({expression:{'zipCode':RegExp('^[0-9]{5}(?:-[0-9]{4})?$') }  ,message:'Zip code should match 12345 or 12345-6789' }) 
	zipCode: string;

	//If you want to apply conditional expression of type 'function'
	@pattern({expression:{'onlyDigit': RegExp(/^[0-9]*$/)}  ,conditionalExpression:(x,y) => x.userName == "Bharat"  }) 
	contactNumber: number;

	//If you want to apply conditional expression of type 'string'
	@pattern({expression:{'onlyDigit': RegExp(/^[0-9]*$/)}  ,conditionalExpression:'x => x.userName=="Bharat"' }) 
	age: number;

}

export class BaseModel {

    static fromPlainObject<T>(this: new () => T, plainObject: Partial<T>): T {
        return Object.assign(new this(), plainObject);
    }

    toPlainObject(): Partial<this> {
        return { ...this }
    }
}

export class UserInfo extends BaseModel {
    @pattern({ expression: { 'validPrice': /^\d+(.\d{1,3})?$/ } })
    totalAmount: number;

}


    describe('Decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "pattern": "Input does not match the pattern requirements",
          }
        });
      });
  
      describe('patternDecorator', () => {

				it('should not error in userName property with alphabetic value.',
				() => {
						let user = new User();
						user.userName = 'Bharat';
						let formGroup = formBuilder.formGroup(user);
						expect(formGroup.controls.userName.errors).toBeNull();
				});

		it('should error in userName property with non alphabet value.',
				() => {
						let user = new User();
						user.userName = 'Bharat@';
						let formGroup = formBuilder.formGroup(user);
						expect(formGroup.controls.userName.errors).toEqual({ 'onlyAlpha': { message: '', refValues: ['Bharat@'] } });
				});

				it("Should error, pattern decorator Shows Custom Validation Message.",
				() => {
						let user = new User();
						let formGroup = formBuilder.formGroup(user);
						formGroup.controls.zipCode.setValue('313001');
						expect(formGroup.controls.zipCode.errors).toEqual({ 'zipCode': { message: 'Zip code should match 12345 or 12345-6789', refValues: ['313001'] } });
				});

				it("Should not error, pattern decorator  Conditional Expression with type 'function'",
				() => {
						let user = new User();
						user.userName = 'Bharat';
						let formGroup = formBuilder.formGroup(user);
						formGroup.controls.contactNumber.setValue(8796547812);
						expect(formGroup.controls.contactNumber.errors).toBeNull();
				});

		it('contactNumber value should be 8796547812.',
				() => {
						let user = new User();
						user.contactNumber = 8796547812;
						let formGroup = formBuilder.formGroup(user);
						expect(formGroup.controls.contactNumber.value).toEqual(8796547812);
				});

		it("Should not error, pattern decorator  Conditional Expression with type 'function'",
				() => {
						let user = new User();
						user.userName = 'Mahesh';
						let formGroup = formBuilder.formGroup(user);
						formGroup.controls.contactNumber.setValue('+91-8796547812');
						expect(formGroup.controls.contactNumber.errors).toBeNull();
				});



		it("Should error, pattern decorator Conditional Expression with type 'function'",
				() => {
						let user = new User();
						user.userName = 'Bharat';
						let formGroup = formBuilder.formGroup(user);
						formGroup.controls.contactNumber.setValue('+91-8796547812');
						expect(formGroup.controls.contactNumber.errors).toEqual({ 'onlyDigit': { message: '', refValues: ['+91-8796547812'] } });
				});


		it("Should not error, pattern decorator  Conditional Expression with type 'string'",
				() => {
						let user = new User();
						user.userName = 'Bharat';
						let formGroup = formBuilder.formGroup(user);
						formGroup.controls.age.setValue(12);
						expect(formGroup.controls.age.errors).toBeNull();
				});

		it('age value should be 12.',
				() => {
						let user = new User();
						user.age = 12;
						let formGroup = formBuilder.formGroup(user);
						expect(formGroup.controls.age.value).toEqual(12);
				});

		it("Should not error, pattern decorator  Conditional Expression with type 'string'",
				() => {
						let user = new User();
						user.userName = 'Mahesh';
						let formGroup = formBuilder.formGroup(user);
						formGroup.controls.age.setValue('+12');
						expect(formGroup.controls.age.errors).toBeNull();
				});

		it("Should error, pattern decorator Conditional Expression with type 'string'",
				() => {
						let user = new User();
						user.userName = 'Bharat';
						let formGroup = formBuilder.formGroup(user);
						formGroup.controls.age.setValue('+12');
						expect(formGroup.controls.age.errors).toEqual({ 'onlyDigit': { message: '', refValues: ['+12'] } });
            });


          //https://github.com/rxweb/rxweb/issues/240
          it("Should error, pattern decorator",
              () => {
                  let userInfo = new UserInfo();
                  let formGroup = formBuilder.formGroup(userInfo);
                  formGroup.controls.totalAmount.setValue("abc");
                  expect(formGroup.controls.totalAmount.errors).toEqual({ 'validPrice': { message: '', refValues: ['abc'] } });
              });
	//end
});
});

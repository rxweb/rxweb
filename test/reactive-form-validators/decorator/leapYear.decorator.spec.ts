import { leapYear, prop,RxFormBuilder, ReactiveFormConfig } from "packages/reactive-form-validators";

export class User {

	@prop()
	name: string;

	//If you want to apply conditional expression of type 'function'
	@leapYear({conditionalExpression:(x,y) => x.name == "Bharat"  }) 
	birthYear: number;

	//If you want to apply conditional expression of type 'string'
	@leapYear({conditionalExpression:'x => x.name == "Bharat"' }) 
	admissionYear: number;

	@leapYear({message:'{{0}} is not a leap year' }) 
	joiningYear: number;

}


    describe('Decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "leapYear": "Please enter a valid leap year",
          }
        });
      });
  
      describe('leapYearDecorator', () => {

        it("Should not error, leapYear decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.name = 'Bharat';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.birthYear.setValue(1996);
        expect(formGroup.controls.birthYear.errors).toBeNull();
     });

    it('birthYear value should be "1996".',
        () => {
        let user = new User();
        user.birthYear = 1996;
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.birthYear.value).toEqual(1996);
     });

     it("Should not error, leapYear decorator  Conditional Expression with type 'function'",
     () => {
     let user = new User();
     user.name = 'Mahesh';
     let formGroup = formBuilder.formGroup(user);
     formGroup.controls.birthYear.setValue(1997);
     expect(formGroup.controls.birthYear.errors).toBeNull();
  });

  it("Should error, leapYear decorator  Conditional Expression with type 'function'",
  () => {
  let user = new User();
  user.name = 'Bharat';
  let formGroup = formBuilder.formGroup(user);
  formGroup.controls.birthYear.setValue(1997);
  expect(formGroup.controls.birthYear.errors).toEqual({'leapYear':{ message: 'Please enter a valid leap year', refValues: [ 1997 ] } });
});

it("Should not error, leapYear decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.name = 'Bharat';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.admissionYear.setValue(20);
        expect(formGroup.controls.admissionYear.errors).toBeNull();
     });

     it('admissionYear value should be "2012".',
        () => {
        let user = new User();
        user.admissionYear = 2012;
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.admissionYear.value).toEqual(2012);
     });

    it("Should not error, leapYear decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.name = 'Mahesh';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.admissionYear.setValue(2011);
        expect(formGroup.controls.admissionYear.errors).toBeNull();
     });



    it("Should error, leapYear decorator Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.name = 'Bharat';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.admissionYear.setValue(2011);
        expect(formGroup.controls.admissionYear.errors).toEqual({'leapYear':{ message: 'Please enter a valid leap year', refValues: [2011 ] } });
     });

     it("Should error, leapYear decorator Shows custom message.",
     () => {
     let user = new User();
     let formGroup = formBuilder.formGroup(user);
     formGroup.controls.joiningYear.setValue(2015);
     expect(formGroup.controls.joiningYear.errors).toEqual({'leapYear':{ message: '2015 is not a leap year', refValues: [ 2015 ] } });
  });

	//end
});
});

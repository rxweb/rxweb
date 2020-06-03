import { notEmpty, ReactiveFormConfig, RxFormBuilder } from '@rxweb/reactive-form-validators';

export class User {

  @notEmpty()
  firstName: string;

  @notEmpty({ conditionalExpression: (x, y) => x.firstName == "Bill" })
  middleName: string;

  @notEmpty({ conditionalExpression: 'x => x.firstName == "Bill"' })
  lastName: string;

  @notEmpty({ message: 'Username cannot be blank.' })
  userName: string;

}




  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "notEmpty": "This field is required",
        }
      });
    });

    describe('notEmptyDecorator', () => {

      it('firstName value should be "Bharat".',
        () => {
          let user = new User();
          user.firstName = 'Bill';
          let formGroup = formBuilder.formGroup(user);
          expect(formGroup.controls.firstName.value).toEqual('Bill');
        });

      it("Should error, FormControl contains space value. ",
        () => {
          let user = new User();
          let formGroup = formBuilder.formGroup(user);
          formGroup.controls.firstName.setValue(' ');
          expect(formGroup.controls.firstName.errors).toEqual({ 'notEmpty': { message: 'This field is required', refValues: [] } });
        });


      it("Should not error, notEmpty decorator  Conditional Expression with type 'function'",
        () => {
          let user = new User();
          user.firstName = 'Bill';
          let formGroup = formBuilder.formGroup(user);
          formGroup.controls.middleName.setValue('J');
          expect(formGroup.controls.middleName.errors).toBeNull();
        });

      it("Should not error, notEmpty decorator  Conditional Expression with type 'function'",
        () => {
          let user = new User();
          user.firstName = 'Mukesh';
          let formGroup = formBuilder.formGroup(user);
          formGroup.controls.middleName.setValue(' ');
          expect(formGroup.controls.middleName.errors).toBeNull();
        });



      it("Should error, notEmpty decorator Conditional Expression with type 'function'",
        () => {
          let user = new User();
          user.firstName = 'Bill';
          let formGroup = formBuilder.formGroup(user);
          formGroup.controls.middleName.setValue(' ');
          expect(formGroup.controls.middleName.errors).toEqual({ 'notEmpty': { message: 'This field is required', refValues: [] } });
        });


      it("Should not error, notEmpty decorator  Conditional Expression with type 'string'",
        () => {
          let user = new User();
          user.firstName = 'Bharat';
          let formGroup = formBuilder.formGroup(user);
          formGroup.controls.lastName.setValue(' ');
          expect(formGroup.controls.lastName.errors).toBeNull();
        });


      it("Should error, notEmpty decorator Conditional Expression with type 'string'",
        () => {
          let user = new User();
          user.firstName = 'Bill';
          let formGroup = formBuilder.formGroup(user);
          formGroup.controls.lastName.setValue(' ');
          expect(formGroup.controls.lastName.errors).toEqual({ 'notEmpty': { message: 'This field is required', refValues: [] } });
        });



      it("Should error, notEmpty decorator Shows Custom Validation Message.",
        () => {
          let user = new User();
          let formGroup = formBuilder.formGroup(user);
          formGroup.controls.userName.setValue(' ');
          expect(formGroup.controls.userName.errors).toEqual({ 'notEmpty': { message: 'Username cannot be blank.', refValues: [] } });
        });



      //end
    });
  });

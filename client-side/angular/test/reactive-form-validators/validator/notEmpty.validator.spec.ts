import { FormBuilder, FormControl} from '@angular/forms';

import { RxwebValidators, ReactiveFormConfig } from '@rxweb/reactive-form-validators';



  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "notEmpty": "This field is required",
        }
      });
    });

    describe('notEmptyValidator', () => {

      it("Should not error, control have value.",
        () => {
          expect(RxwebValidators.notEmpty()(new FormControl('India'))).toBeNull();
        });


      it("Should error, should error when it's blank",
        () => {
          expect(RxwebValidators.notEmpty()(new FormControl(''))).toEqual({ 'notEmpty': { message: 'This field is required', refValues: [] } });
        });

      it("Should error, only space value in the FormControl",
        () => {
          expect(RxwebValidators.notEmpty()(new FormControl(' '))).toEqual({ 'notEmpty': { message: 'This field is required', refValues: [] } });
        });

      it("Should not error, conditionExpression not passed with firstName == 'Mukesh'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'firstName': ['Mukesh'],
            'middleName': ''
          });
          expect(RxwebValidators.notEmpty({ conditionalExpression: (x, y) => x.firstName == "Bill" })(formGroup.controls.middleName)).toBeNull()
        });


      it("Should error,  conditionExpression passed with firstName == 'Bill' and middleName contains only space.",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'firstName': ['Bill'],
            'middleName': ' '
          });
          expect(RxwebValidators.notEmpty({ conditionalExpression: (x, y) => x.firstName == "Bill" })(formGroup.controls.middleName)).toEqual({ 'notEmpty': { message: 'This field is required', refValues: [] } });
        });


      it("Should not error, conditionExpression not passed with firstName == 'Bill' and middleName contains only space. expression type is 'string'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'firstName': ['Bill'],
            'lastName': ' '
          });
          expect(RxwebValidators.notEmpty({ conditionalExpression: 'x => x.firstName == "Bharat"' })(formGroup.controls.lastName)).toBeNull()
        });

      it("Should error, conditional expression condition matched and conditionalExpression type of 'string'. ",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'firstName': ['Bharat'],
            'lastName': ' '
          });
          expect(RxwebValidators.notEmpty({ conditionalExpression: 'x => x.firstName == "Bharat"' })(formGroup.controls.lastName)).toEqual({ 'notEmpty': { message: 'This field is required', refValues: [] } });
        });



      it("Should error, notEmpty validator Shows Custom Validation Message.",
        () => {
          expect(RxwebValidators.notEmpty({ message: 'Username cannot be blank.' })(new FormControl(''))).toEqual({ 'notEmpty': { message: 'Username cannot be blank.', refValues: [] } });
        });

      it("Should not error, once reset the FormControl with value of '0'",
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'amount': [1, RxwebValidators.notEmpty()],
          });
          formGroup.reset({ amount: 0 })
          expect(formGroup.controls.amount.errors).toBeNull();
        });


      //end
    });
  });

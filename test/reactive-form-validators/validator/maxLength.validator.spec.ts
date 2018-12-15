import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';



(function() {
  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "maxLength": "Maximum Length is not matched",
        }
      });
    });

    describe('maxLengthValidator', () => {

	      it("Should not error, maxLength validator If you want to apply conditional validation on 'Middle Name' or 'Last name', then you need to add 'First Name' input as 'Bharat'",
        () => { 
          expect(RxwebValidators.maxLength({value:16})(new FormControl('Bharat'))).toBeNull(); 
        });


      it("Should error, maxLength validator If you want to apply conditional validation on 'Middle Name' or 'Last name', then you need to add 'First Name' input as 'Bharat'",
        () => { 
          expect(RxwebValidators.maxLength({value:16})(new FormControl('SamanthaRuthPrabhu'))).toEqual({'maxLength':{ message: 'Maximum Length is not matched', refValues: [ 'SamanthaRuthPrabhu',16 ] } }); 
        });


      it("Should not error, maxLength validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'firstName':['Bharat'],
            'middleName':'Bharat'
          });
          expect(RxwebValidators.maxLength({value:16,conditionalExpression:(x,y)=> x.firstName == "Bharat"})(formGroup.controls.middleName)).toBeNull()
        });

      it("Should not error, maxLength validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'firstName':['Mahesh'],
            'middleName':'AtharintikiDaaredi'
          });
          expect(RxwebValidators.maxLength({value:16,conditionalExpression:(x,y)=> x.firstName == "Bharat"})(formGroup.controls.middleName)).toBeNull()
        });


      it("Should error,  maxLength validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'firstName':['Bharat'],
            'middleName':'AtharintikiDaaredi'
          });
          expect(RxwebValidators.maxLength({value:16,conditionalExpression:(x,y)=> x.firstName == "Bharat"})(formGroup.controls.middleName)).toEqual({'maxLength':{ message: 'Maximum Length is not matched', refValues: [ 'AtharintikiDaaredi',16 ] } }); 
        });


      it("Should not error, maxLength validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'firstName':['Bharat'],
            'lastName':'Bharat'
          });
          expect(RxwebValidators.maxLength({value:16,conditionalExpression:'x => x.firstName == "Bharat"'})(formGroup.controls.lastName)).toBeNull()
        });

      it("Should not error, maxLength validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'firstName':['Mahesh'],
            'lastName':'AtharintikiDaaredi'
          });
          expect(RxwebValidators.maxLength({value:16,conditionalExpression:'x => x.firstName == "Bharat"'})(formGroup.controls.lastName)).toBeNull()
        });


      it("Should error,  maxLength validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'firstName':['Bharat'],
            'lastName':'AtharintikiDaaredi'
          });
          expect(RxwebValidators.maxLength({value:16,conditionalExpression:'x => x.firstName == "Bharat"'})(formGroup.controls.lastName)).toEqual({'maxLength':{ message: 'Maximum Length is not matched', refValues: [ 'AtharintikiDaaredi',16 ] } }); 
        });




	//end
    });
  });
})();

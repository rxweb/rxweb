import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "required": "This field is required",
        }
      });
    });

    describe('required', () => {

	      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.required()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.required()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.required()(new FormControl(undefined))).toBeNull(); 
        });

      it("Should not error, If you want to apply conditional validation on 'Middle Name' or 'Last Name', then you need to add 'First Name' input as 'Bharat'",
        () => { 
          expect(RxwebValidators.required()(new FormControl('Bharat'))).toBeNull(); 
        });


      it("Should error, If you want to apply conditional validation on 'Middle Name' or 'Last Name', then you need to add 'First Name' input as 'Bharat'",
        () => { 
          expect(RxwebValidators.required()(new FormControl(''))).toEqual({'required':{ message: 'This field is required', refValues: [ '' ] } }); 
        });

      it("Should not error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'firstName':['Bharat'],
            'middleName':'Raj'
          });
          expect(RxwebValidators.required({conditionalExpression:(x,y) => x.firstName == "Bharat" })(formGroup.controls.middleName)).toBeNull()
        });

      it("Should not error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'firstName':['Mukesh'],
            'middleName':''
          });
          expect(RxwebValidators.required({conditionalExpression:(x,y) => x.firstName == "Bharat" })(formGroup.controls.middleName)).toBeNull()
        });


      it("Should error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'firstName':['Bharat'],
            'middleName':''
          });
          expect(RxwebValidators.required({conditionalExpression:(x,y) => x.firstName == "Bharat" })(formGroup.controls.middleName)).toEqual({'required':{ message: 'This field is required', refValues: [ '' ] } }); 
        });

      it("Should not error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'firstName':['Bharat'],
            'lastName':'Shah'
          });
          expect(RxwebValidators.required({conditionalExpression:'x => x.firstName == "Bharat"'})(formGroup.controls.lastName)).toBeNull()
        });

      it("Should not error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'firstName':['Mukesh'],
            'lastName':''
          });
          expect(RxwebValidators.required({conditionalExpression:'x => x.firstName == "Bharat"'})(formGroup.controls.lastName)).toBeNull()
        });


      it("Should error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'firstName':['Bharat'],
            'lastName':''
          });
          expect(RxwebValidators.required({conditionalExpression:'x => x.firstName == "Bharat"'})(formGroup.controls.lastName)).toEqual({'required':{ message: 'This field is required', refValues: [ '' ] } }); 
        });


      it("Should error, Shows Custom Validation Message.",
        () => { 
          expect(RxwebValidators.required({message:'Username cannot be blank.'})(new FormControl(''))).toEqual({'required':{ message: 'Username cannot be blank.', refValues: [ '' ] } }); 
        });



	//end
    });
  });
})();


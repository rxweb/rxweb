import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';



(function() {
  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "email": "Invalid email format",
        }
      });
    });

    describe('emailValidator', () => {

	      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.email()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.email()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.email()(new FormControl(undefined))).toBeNull(); 
        });

      it("Should not error, email validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'email':['abc@gmail.com'],
            'recoveryEmailAddress':'ajay.ojha@radixweb.com'
          });
          expect(RxwebValidators.email({conditionalExpression:(x,y) => x.email == "abc@gmail.com" })(formGroup.controls.recoveryEmailAddress)).toBeNull()
        });

      it("Should not error, email validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'email':['john@gmail.com'],
            'recoveryEmailAddress':'ajayojha@radix'
          });
          expect(RxwebValidators.email({conditionalExpression:(x,y) => x.email == "abc@gmail.com" })(formGroup.controls.recoveryEmailAddress)).toBeNull()
        });


      it("Should error,  email validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'email':['abc@gmail.com'],
            'recoveryEmailAddress':'ajayojha@radix'
          });
          expect(RxwebValidators.email({conditionalExpression:(x,y) => x.email == "abc@gmail.com" })(formGroup.controls.recoveryEmailAddress)).toEqual({'email':{ message: 'Invalid email format', refValues: [ 'ajayojha@radix' ] } }); 
        });


      it("Should not error, email validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'email':['abc@gmail.com'],
            'businessEmailAddress':'ajay.ojha@radixweb.com'
          });
          expect(RxwebValidators.email({conditionalExpression:'x => x.email =="abc@gmail.com"'})(formGroup.controls.businessEmailAddress)).toBeNull()
        });

      it("Should not error, email validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'email':['alex@gmail.com'],
            'businessEmailAddress':'ajayojha@radix'
          });
          expect(RxwebValidators.email({conditionalExpression:'x => x.email =="abc@gmail.com"'})(formGroup.controls.businessEmailAddress)).toBeNull()
        });


      it("Should error,  email validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'email':['abc@gmail.com'],
            'businessEmailAddress':'ajayojha@radix'
          });
          expect(RxwebValidators.email({conditionalExpression:'x => x.email =="abc@gmail.com"'})(formGroup.controls.businessEmailAddress)).toEqual({'email':{ message: 'Invalid email format', refValues: [ 'ajayojha@radix' ] } }); 
        });



      it("Should error, email validator Shows custom message",
        () => { 
          expect(RxwebValidators.email({message:'Please enter valid email'})(new FormControl('ajayojha@radix'))).toEqual({'email':{ message: 'Please enter valid email', refValues: [ 'ajayojha@radix' ] } }); 
        });




	//end
    });
  });
})();

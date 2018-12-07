import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "email": "Invalid email format",
        }
      });
    });

    describe('email', () => {
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

      it('should not give error on control which contains value which is proper email.',
        () => { 
          expect(RxwebValidators.email()(new FormControl('xyz@gmail.com'))).toBeNull(); 
        });

      it('should give error on control which contains value which is not proper email.',
        () => { 
          expect(RxwebValidators.email()(new FormControl('xyz@xyz'))).toEqual({'email':{ message: 'Invalid email format', refValues: [ 'xyz@xyz' ] } }); 
        });


	      it('should not give error if the email value is abc@gmail.com in recoveryEmailAddress FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'email':['abc@gmail.com'],
            'recoveryEmailAddress':['xyz@gmail.com'],
          });
          expect(RxwebValidators.email({conditionalExpression:(x,y) => x.email == "abc@gmail.com" })(formGroup.controls.recoveryEmailAddress)).toBeNull();

        });

	      it('should not give error if the email value is abc@gmail.com in businessEmailAddress FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'email':['abc@gmail.com'],
            'businessEmailAddress':['xyz@gmail.com'],
          });
          expect(RxwebValidators.email({conditionalExpression:'x => x.email =="abc@gmail.com"'})(formGroup.controls.businessEmailAddress)).toBeNull();

        });

	      it('should not give error if the email value is not abc@gmail.com in recoveryEmailAddress FormControl  with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'email':['mno@gmail.com'],
            'recoveryEmailAddress':['xyz@gmail.com'],
          });
          expect(RxwebValidators.email({conditionalExpression:(x,y) => x.email == "abc@gmail.com" })(formGroup.controls.recoveryEmailAddress)).toBeNull();

        });

	      it('should not give error if the email value is abc@gmail.com in businessEmailAddress FormControl  with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'email':['rto@gmail.com'],
            'businessEmailAddress':['xyz@gmail.com'],
          });
          expect(RxwebValidators.email({conditionalExpression:'x => x.email =="abc@gmail.com"'})(formGroup.controls.businessEmailAddress)).toBeNull();

        });


	      it('should  give error if the email value is abc@gmail.com and non email input in recoveryEmailAddress FormControl  with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'email':['abc@gmail.com'],
            'recoveryEmailAddress':['xyz@xyz'],
          });
          expect(RxwebValidators.email({conditionalExpression:(x,y) => x.email == "abc@gmail.com" })(formGroup.controls.recoveryEmailAddress)).toEqual({'email':{ message: 'Invalid email format', refValues: [ 'xyz@xyz' ] } });

        });

	      it('should give error if the email value is abc@gmail.com in businessEmailAddress FormControl  with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'email':['abc@gmail.com'],
            'businessEmailAddress':['xyz@xyz'],
          });
          expect(RxwebValidators.email({conditionalExpression:'x => x.email =="abc@gmail.com"'})(formGroup.controls.businessEmailAddress)).toEqual({'email':{ message: 'Invalid email format', refValues: [ 'xyz@xyz' ] } });

        });




	      it('should give error if the control contains value which is not valid email',
        () => {
          expect(RxwebValidators.email({message:'Please enter valid email'})(new FormControl('xyz@xyz'))).toEqual({'email':{ message: 'Please enter valid email', refValues: [ 'xyz@xyz' ] } });

        });



//end
    });
  });
})();

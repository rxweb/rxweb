import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';



(function() {
  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "contains": "input not contain string",
        }
      });
    });

    describe('containsValidator', () => {

	      it("Should not error, contains validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'emailAddress':['abc@gmail.com'],
            'businessEmailAddress':'xyz@gmail.com'
          });
          expect(RxwebValidators.contains({value:'@gmail.com',conditionalExpression:(x,y) => x.emailAddress == "abc@gmail.com"})(formGroup.controls.businessEmailAddress)).toBeNull()
        });

      it("Should not error, contains validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'emailAddress':['xyz@gmail.com'],
            'businessEmailAddress':'mno@rediff.com'
          });
          expect(RxwebValidators.contains({value:'@gmail.com',conditionalExpression:(x,y) => x.emailAddress == "abc@gmail.com"})(formGroup.controls.businessEmailAddress)).toBeNull()
        });


      it("Should error,  contains validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'emailAddress':['abc@gmail.com'],
            'businessEmailAddress':'abc@yahoo.com'
          });
          expect(RxwebValidators.contains({value:'@gmail.com',conditionalExpression:(x,y) => x.emailAddress == "abc@gmail.com"})(formGroup.controls.businessEmailAddress)).toEqual({'contains':{ message: 'input not contain string', refValues: [ 'abc@yahoo.com','@gmail.com' ] } }); 
        });


      it("Should not error, contains validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'emailAddress':['abc@gmail.com'],
            'recoveryEmailAddress':'xyz@gmail.com'
          });
          expect(RxwebValidators.contains({value:'@gmail.com',conditionalExpression:'x => x.emailAddress == "abc@gmail.com"'})(formGroup.controls.recoveryEmailAddress)).toBeNull()
        });

      it("Should not error, contains validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'emailAddress':['john@gmail.com'],
            'recoveryEmailAddress':'mark@rediff.com'
          });
          expect(RxwebValidators.contains({value:'@gmail.com',conditionalExpression:'x => x.emailAddress == "abc@gmail.com"'})(formGroup.controls.recoveryEmailAddress)).toBeNull()
        });


      it("Should error,  contains validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'emailAddress':['abc@gmail.com'],
            'recoveryEmailAddress':'abc@yahoo.com'
          });
          expect(RxwebValidators.contains({value:'@gmail.com',conditionalExpression:'x => x.emailAddress == "abc@gmail.com"'})(formGroup.controls.recoveryEmailAddress)).toEqual({'contains':{ message: 'input not contain string', refValues: [ 'abc@yahoo.com','@gmail.com' ] } }); 
        });



      it("Should error, contains validator Shows custom message",
        () => { 
          expect(RxwebValidators.contains({value:'@gmail.com',message:'Please enter valid gmailId'})(new FormControl('admin123@hotmail.com'))).toEqual({'contains':{ message: 'Please enter valid gmailId', refValues: [ 'admin123@hotmail.com','@gmail.com' ] } }); 
        });




	//end
    });
  });
})();

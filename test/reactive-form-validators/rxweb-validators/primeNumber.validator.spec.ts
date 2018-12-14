import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "primeNumber": "Please enter a valid prime number",
        }
      });
    });

    describe('primeNumber', () => {

	      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.primeNumber()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.primeNumber()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.primeNumber()(new FormControl(undefined))).toBeNull(); 
        });

      it("Should not error, If you want to apply conditional validation on 'Second Number' or 'Third Number', then you need to add 'Number Type' input as 'Prime'.",
        () => { 
          expect(RxwebValidators.primeNumber()(new FormControl(13))).toBeNull(); 
        });


      it("Should error, If you want to apply conditional validation on 'Second Number' or 'Third Number', then you need to add 'Number Type' input as 'Prime'.",
        () => { 
          expect(RxwebValidators.primeNumber()(new FormControl(14))).toEqual({'primeNumber':{ message: 'Please enter a valid prime number', refValues: [ 14 ] } }); 
        });

      it("Should not error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'numberType':['Prime'],
            'secondNumber':17
          });
          expect(RxwebValidators.primeNumber({conditionalExpression:(x,y) => x.numberType == "Prime" })(formGroup.controls.secondNumber)).toBeNull()
        });

      it("Should not error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'numberType':['Composite'],
            'secondNumber':15
          });
          expect(RxwebValidators.primeNumber({conditionalExpression:(x,y) => x.numberType == "Prime" })(formGroup.controls.secondNumber)).toBeNull()
        });


      it("Should error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'numberType':['Prime'],
            'secondNumber':12
          });
          expect(RxwebValidators.primeNumber({conditionalExpression:(x,y) => x.numberType == "Prime" })(formGroup.controls.secondNumber)).toEqual({'primeNumber':{ message: 'Please enter a valid prime number', refValues: [ 12 ] } }); 
        });

      it("Should not error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'numberType':['Prime'],
            'thirdNumber':17
          });
          expect(RxwebValidators.primeNumber({conditionalExpression:'x => x.numberType =="Prime"'})(formGroup.controls.thirdNumber)).toBeNull()
        });

      it("Should not error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'numberType':['Composite'],
            'thirdNumber':15
          });
          expect(RxwebValidators.primeNumber({conditionalExpression:'x => x.numberType =="Prime"'})(formGroup.controls.thirdNumber)).toBeNull()
        });


      it("Should error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'numberType':['Prime'],
            'thirdNumber':12
          });
          expect(RxwebValidators.primeNumber({conditionalExpression:'x => x.numberType =="Prime"'})(formGroup.controls.thirdNumber)).toEqual({'primeNumber':{ message: 'Please enter a valid prime number', refValues: [ 12 ] } }); 
        });


      it("Should error, Shows custom message.",
        () => { 
          expect(RxwebValidators.primeNumber({message:'{{0}} is not a prime number'})(new FormControl(20))).toEqual({'primeNumber':{ message: '20 is not a prime number', refValues: [ 20 ] } }); 
        });



	//end
    });
  });
})();


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

      it('should not give error, if the control contains any prime number value',
        () => { 
          expect(RxwebValidators.primeNumber()(new FormControl(13))).toBeNull(); 
        });

      it('should give error, if the control do not contains any prime number value',
        () => { 
          expect(RxwebValidators.primeNumber()(new FormControl(20))).toEqual({'primeNumber':{ message: 'Please enter a valid prime number', refValues: [ 20 ] } }); 
        });


	      it('should not give error if the numberType value is Prime and prime number value in secondNumber FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'numberType':['Prime'],
            'secondNumber':[13],
          });
          expect(RxwebValidators.primeNumber({conditionalExpression:(x,y) => x.numberType == "Prime" })(formGroup.controls.secondNumber)).toBeNull();

        });

	      it('should not give error if the numberType value is Prime and prime number value in thirdNumber FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'numberType':['Prime'],
            'thirdNumber':[17],
          });
          expect(RxwebValidators.primeNumber({conditionalExpression:'x => x.numberType =="Prime"'})(formGroup.controls.thirdNumber)).toBeNull();

        });

	      it('should not give error if the numberType value is Composite and non prime number value in secondNumber FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'numberType':['Composite'],
            'secondNumber':[12],
          });
          expect(RxwebValidators.primeNumber({conditionalExpression:(x,y) => x.numberType == "Prime" })(formGroup.controls.secondNumber)).toBeNull();

        });

	      it('should not give error if the numberType value is Composite and non prime number value in thirdNumber FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'numberType':['Composite'],
            'thirdNumber':[10],
          });
          expect(RxwebValidators.primeNumber({conditionalExpression:'x => x.numberType =="Prime"'})(formGroup.controls.thirdNumber)).toBeNull();

        });


	      it('should give error if the numberType value is Prime and non prime number value in secondNumber FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'numberType':['Prime'],
            'secondNumber':[16],
          });
          expect(RxwebValidators.primeNumber({conditionalExpression:(x,y) => x.numberType == "Prime" })(formGroup.controls.secondNumber)).toEqual({'primeNumber':{ message: 'Please enter a valid prime number', refValues: [ 16 ] } });

        });

	      it('should give error if the numberType value is Prime and non prime number value in thirdNumber FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'numberType':['Prime'],
            'thirdNumber':[10],
          });
          expect(RxwebValidators.primeNumber({conditionalExpression:'x => x.numberType =="Prime"'})(formGroup.controls.thirdNumber)).toEqual({'primeNumber':{ message: 'Please enter a valid prime number', refValues: [ 10 ] } });

        });




	      it('should give error, if the control do not contains any prime number value',
        () => {
          expect(RxwebValidators.primeNumber({message:'{{0}} is not a prime number'})(new FormControl(20))).toEqual({'primeNumber':{ message: '20 is not a prime number', refValues: [ 20 ] } });

        });



//end
    });
  });
})();

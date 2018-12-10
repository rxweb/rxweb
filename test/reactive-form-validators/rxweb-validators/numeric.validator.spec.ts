import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig , NumericValueType } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "numeric": "Enter a valid numeric digit.",
        }
      });
    });

    describe('numeric', () => {
      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.numeric()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.numeric()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.numeric()(new FormControl(undefined))).toBeNull(); 
        });

      it('should not give error, if the control contains any positive value',
        () => { 
          expect(RxwebValidators.numeric()(new FormControl(13))).toBeNull(); 
        });

      it('should give error, if the control do not contains any non positive value',
        () => { 
          expect(RxwebValidators.numeric()(new FormControl(-20))).toEqual({'numeric':{ message: 'Enter a valid numeric digit.', refValues: [ -20 ] } }); 
        });


	      it('should not give error, if the control contains a negative value without decimals',
        () => {
          expect(RxwebValidators.numeric({acceptValue:NumericValueType.NegativeNumber})(new FormControl('-6'))).toBeNull();

        });

	      it('should not give error, if the control contains a positive value without decimals',
        () => {
          expect(RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber})(new FormControl(8))).toBeNull();

        });

	      it('should not give error, if the control contains both negative and positive value without decimals',
        () => {
          expect(RxwebValidators.numeric({acceptValue:NumericValueType.Both})(new FormControl(10))).toBeNull();

        });


	      it('should give error, if the control contains a non negative value without decimals',
        () => {
          expect(RxwebValidators.numeric({acceptValue:NumericValueType.NegativeNumber})(new FormControl(6))).toEqual({'numeric':{ message: 'Enter a valid numeric digit.', refValues: [ 6 ] } });

        });

	      it('should give error, if the control contains a non positive value without decimals',
        () => {
          expect(RxwebValidators.numeric({acceptValue:NumericValueType.PositiveNumber})(new FormControl('-8'))).toEqual({'numeric':{ message: 'Enter a valid numeric digit.', refValues: [ '-8' ] } });

        });

	      it('should give error, if the control does not contain either negative or positive value without decimals',
        () => {
          expect(RxwebValidators.numeric({acceptValue:NumericValueType.Both})(new FormControl(10.23))).toEqual({'numeric':{ message: 'Enter a valid numeric digit.', refValues: [ 10.23 ] } });

        });




	      it('should give error, if the control contains a non negative value without decimals',
        () => {
          expect(RxwebValidators.numeric({message:'{{0}} is not a negative number',acceptValue:NumericValueType.NegativeNumber})(new FormControl(10))).toEqual({'numeric':{ message: '10 is not a negative number', refValues: [ 10 ] } });

        });

	      it('should give error, if the control does not contain a positive decimal number',
        () => {
          expect(RxwebValidators.numeric({message:'{{0}} is not a decimal number',allowDecimal:true})(new FormControl(-1.9))).toEqual({'numeric':{ message: '-1.9 is not a decimal number', refValues: [ -1.9 ] } });

        });



	      it('should not give error, if the control contains a positive decimal number',
        () => {
          expect(RxwebValidators.numeric({allowDecimal:true})(new FormControl(5.1))).toBeNull();

        });


	      it('should give error, if the control contains a decimal number',
        () => {
          expect(RxwebValidators.numeric({allowDecimal:false})(new FormControl(1.9))).toEqual({'numeric':{ message: 'Enter a valid numeric digit.', refValues: [ 1.9 ] } });

        });



	      it('should not give error if the dataType value is Positive and positive value in integerNumber FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'dataType':['Positive'],
            'integerNumber':[10],
          });
          expect(RxwebValidators.numeric({conditionalExpression:(x,y) => x.dataType == "Positive" ,acceptValue:NumericValueType.PositiveNumber})(formGroup.controls.integerNumber)).toBeNull();

        });

	      it('should not give error if the dataType value is Real and real value in integerNumber FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'dataType':['Real'],
            'realNumber':[-101],
          });
          expect(RxwebValidators.numeric({conditionalExpression:'x => x.dataType == "Real"',acceptValue:NumericValueType.Both})(formGroup.controls.realNumber)).toBeNull();

        });

	      it('should not give error if the dataType value is Real and non positive value in integerNumber FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'dataType':['Real'],
            'integerNumber':[-10],
          });
          expect(RxwebValidators.numeric({conditionalExpression:(x,y) => x.dataType == "Positive" ,acceptValue:NumericValueType.PositiveNumber})(formGroup.controls.integerNumber)).toBeNull();

        });

	      it('should not give error if the dataType value is Positive and non real value in integerNumber FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'dataType':['Positive'],
            'realNumber':[-101.66],
          });
          expect(RxwebValidators.numeric({conditionalExpression:'x => x.dataType == "Real"',acceptValue:NumericValueType.Both})(formGroup.controls.realNumber)).toBeNull();

        });


	      it('should not give error if the dataType value is Positive and non positive value in integerNumber FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'dataType':['Positive'],
            'integerNumber':[-10],
          });
          expect(RxwebValidators.numeric({conditionalExpression:(x,y) => x.dataType == "Positive" ,acceptValue:NumericValueType.PositiveNumber})(formGroup.controls.integerNumber)).toEqual({'numeric':{ message: 'Enter a valid numeric digit.', refValues: [ -10 ] } });

        });

	      it('should not give error if the dataType value is Real and non real value in integerNumber FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'dataType':['Real'],
            'realNumber':[-101.99],
          });
          expect(RxwebValidators.numeric({conditionalExpression:'x => x.dataType == "Real"',acceptValue:NumericValueType.Both})(formGroup.controls.realNumber)).toEqual({'numeric':{ message: 'Enter a valid numeric digit.', refValues: [ -101.99 ] } });

        });



//end
    });
  });
})();

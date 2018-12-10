import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "odd": "Enter a valid odd number.",
        }
      });
    });

    describe('odd', () => {
      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.odd()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.odd()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.odd()(new FormControl(undefined))).toBeNull(); 
        });

      it('should not give error, if the control contains any odd value',
        () => { 
          expect(RxwebValidators.odd()(new FormControl(13))).toBeNull(); 
        });

      it('should give error, if the control do not contains any odd value',
        () => { 
          expect(RxwebValidators.odd()(new FormControl(20))).toEqual({'odd':{ message: 'Enter a valid odd number.', refValues: [ 20 ] } }); 
        });


	      it('should not give error if the type value is Odd and odd value in number FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'type':['Odd'],
            'number':[13],
          });
          expect(RxwebValidators.odd({conditionalExpression:(x,y) => x.type == "Odd" })(formGroup.controls.number)).toBeNull();

        });

	      it('should not give error if the type value is Odd and odd value in oddNumber FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'type':['Odd'],
            'oddNumber':[5],
          });
          expect(RxwebValidators.odd({conditionalExpression:'x => x.type == "Odd"'})(formGroup.controls.oddNumber)).toBeNull();

        });

	      it('should not give error if the type value is Even and non odd value in number FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'type':['Even'],
            'number':[14],
          });
          expect(RxwebValidators.odd({conditionalExpression:(x,y) => x.type == "Odd" })(formGroup.controls.number)).toBeNull();

        });

	      it('should not give error if the type value is Even and non odd value in oddNumber FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'type':['Even'],
            'oddNumber':[4],
          });
          expect(RxwebValidators.odd({conditionalExpression:'x => x.type == "Odd"'})(formGroup.controls.oddNumber)).toBeNull();

        });


	      it('should give error if the type value is Odd and non odd value in number FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'type':['Odd'],
            'number':[14],
          });
          expect(RxwebValidators.odd({conditionalExpression:(x,y) => x.type == "Odd" })(formGroup.controls.number)).toEqual({'odd':{ message: 'Enter a valid odd number.', refValues: [ 14 ] } });

        });

	      it('should give error if the type value is Odd and non odd value in oddNumber FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'type':['Odd'],
            'oddNumber':[6],
          });
          expect(RxwebValidators.odd({conditionalExpression:'x => x.type == "Odd"'})(formGroup.controls.oddNumber)).toEqual({'odd':{ message: 'Enter a valid odd number.', refValues: [ 6 ] } });

        });




	      it('should give error, if the control contains a non odd value',
        () => {
          expect(RxwebValidators.odd({message:'{{0}} is not an odd number'})(new FormControl(20))).toEqual({'odd':{ message: '20 is not an odd number', refValues: [ 20 ] } });

        });



//end
    });
  });
})();

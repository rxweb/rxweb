import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "even": "Enter a valid even number.",
        }
      });
    });

    describe('even', () => {
      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.even()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.even()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.even()(new FormControl(undefined))).toBeNull(); 
        });

      it('should not give error on control which contains value which is even number.',
        () => { 
          expect(RxwebValidators.even()(new FormControl('2000'))).toBeNull(); 
        });

      it('should give error on control which contains value which is not even number.',
        () => { 
          expect(RxwebValidators.even()(new FormControl(2001))).toEqual({'even':{ message: 'Enter a valid even number.', refValues: [ 2001 ] } }); 
        });


	      it('should not give error if the type field value is even in number FormControl  with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'type':['Even'],
            'number':['20'],
          });
          expect(RxwebValidators.even({conditionalExpression:(x,y) => x.type == "Even" })(formGroup.controls.number)).toBeNull();

        });

	      it('should not give error if the field value is even in evenNumber FormControl  with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'type':['Even'],
            'evenNumber':['22'],
          });
          expect(RxwebValidators.even({conditionalExpression:'x => x.type == "Even"'})(formGroup.controls.evenNumber)).toBeNull();

        });

	      it('should not give error if the type field value is xyz in number FormControl  with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'type':['xyz'],
            'number':['91'],
          });
          expect(RxwebValidators.even({conditionalExpression:(x,y) => x.type == "Even" })(formGroup.controls.number)).toBeNull();

        });

	      it('should not give error if the type value is xyz in evenNumber FormControl  with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'type':['xyz'],
            'evenNumber':['13'],
          });
          expect(RxwebValidators.even({conditionalExpression:'x => x.type == "Even"'})(formGroup.controls.evenNumber)).toBeNull();

        });


	      it('should give error if the type value is xyz and value is not even in number FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'type':['Even'],
            'number':['13'],
          });
          expect(RxwebValidators.even({conditionalExpression:(x,y) => x.type == "Even" })(formGroup.controls.number)).toEqual({'even':{ message: 'Enter a valid even number.', refValues: [ '13' ] } });

        });

	      it('should give error if the type value is xyz and value is not even in number FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'type':['Even'],
            'evenNumber':['15'],
          });
          expect(RxwebValidators.even({conditionalExpression:'x => x.type == "Even"'})(formGroup.controls.evenNumber)).toEqual({'even':{ message: 'Enter a valid even number.', refValues: [ '15' ] } });

        });




	      it('should give error ,if the control contains value which is not even',
        () => {
          expect(RxwebValidators.even({message:'{{0}} is not an even number'})(new FormControl('2001'))).toEqual({'even':{ message: '2001 is not an even number', refValues: [ '2001' ] } });

        });



//end
    });
  });
})();

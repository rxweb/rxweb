import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "minNumber": "Number should less than equal to minimum number.",
        }
      });
    });

    describe('minNumber', () => {

      it('should not give error, if the control contains any value greater than 35',
        () => { 
          expect(RxwebValidators.minNumber({value:35,})(new FormControl(43))).toBeNull(); 
        });

      it('should give error, if the control contains any value less than 35',
        () => { 
          expect(RxwebValidators.minNumber({value:35,})(new FormControl(20))).toEqual({'minNumber':{ message: 'Number should less than equal to minimum number.', refValues: [ 20,35 ] } }); 
        });


	      it('should not give error, if the control contains value greater than 35',
        () => {
          expect(RxwebValidators.minNumber({value:35})(new FormControl(50))).toBeNull();

        });


	      it('should give error, if the control contains value less than 35',
        () => {
          expect(RxwebValidators.minNumber({value:35})(new FormControl(30))).toEqual({'minNumber':{ message: 'Number should less than equal to minimum number.', refValues: [ 30,35 ] } });

        });




	      it('should give error, if the control contains value less than 35',
        () => {
          expect(RxwebValidators.minNumber({message:'Number should not be less than 35',value:35})(new FormControl(32))).toEqual({'minNumber':{ message: 'Number should not be less than 35', refValues: [ 32,35 ] } });

        });



	      it('should not give error if the maths value is 50 and value greater than 35 in english FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'maths':[50],
            'english':[80],
          });
          expect(RxwebValidators.minNumber({conditionalExpression:(x,y) => x.maths == 50 ,value:35})(formGroup.controls.english)).toBeNull();

        });

	      it('should not give error if the maths value is 50 and value greater than 35 in statstics FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'maths':[50],
            'statstics':[60],
          });
          expect(RxwebValidators.minNumber({conditionalExpression:'x => x.maths == 50',value:35})(formGroup.controls.statstics)).toBeNull();

        });

	      it('should not give error if the maths value is 40 and value less than 35 in english FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'maths':[40],
            'english':[30],
          });
          expect(RxwebValidators.minNumber({conditionalExpression:(x,y) => x.maths == 50 ,value:35})(formGroup.controls.english)).toBeNull();

        });

	      it('should not give error if the maths value is 40 and value less than 35 in statstics FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'maths':[40],
            'statstics':[32],
          });
          expect(RxwebValidators.minNumber({conditionalExpression:'x => x.maths == 50',value:35})(formGroup.controls.statstics)).toBeNull();

        });


	      it('should give error if the maths value is 50 and value less than 35 in english FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'maths':[50],
            'english':[30],
          });
          expect(RxwebValidators.minNumber({conditionalExpression:(x,y) => x.maths == 50 ,value:35})(formGroup.controls.english)).toEqual({'minNumber':{ message: 'Number should less than equal to minimum number.', refValues: [ 30,35 ] } });

        });

	      it('should give error if the maths value is 50 and value less than 35 in statstics FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'maths':[50],
            'statstics':[30],
          });
          expect(RxwebValidators.minNumber({conditionalExpression:'x => x.maths == 50',value:35})(formGroup.controls.statstics)).toEqual({'minNumber':{ message: 'Number should less than equal to minimum number.', refValues: [ 30,35 ] } });

        });



//end
    });
  });
})();

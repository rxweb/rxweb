import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "range": "Input value not in range",
        }
      });
    });

    describe('range', () => {

      it('should not give error, if the control contains value in between the range',
        () => { 
          expect(RxwebValidators.range({minimumNumber:18,maximumNumber:60,})(new FormControl(20))).toBeNull(); 
        });

      it('should give error, if the control do not contains value in between the range',
        () => { 
          expect(RxwebValidators.range({minimumNumber:18,maximumNumber:60,})(new FormControl(15))).toEqual({'range':{ message: 'Input value not in range', refValues: [ 15,18,60 ] } }); 
        });


	      it('should not give error, if the control contains value greater than equal to 18.',
        () => {
          expect(RxwebValidators.range({minimumNumber:18,maximumNumber:60})(new FormControl(20))).toBeNull();

        });


	      it('should give error, if the control contains value less than 18',
        () => {
          expect(RxwebValidators.range({minimumNumber:18,maximumNumber:60})(new FormControl(17))).toEqual({'range':{ message: 'Input value not in range', refValues: [ 17,18,60 ] } });

        });



	      it('should not give error, if the control contains value less than equal to 60.',
        () => {
          expect(RxwebValidators.range({maximumNumber:60,minimumNumber:18})(new FormControl(59))).toBeNull();

        });


	      it('should give error, if the control contains value greater than 60.',
        () => {
          expect(RxwebValidators.range({maximumNumber:60,minimumNumber:18})(new FormControl(61))).toEqual({'range':{ message: 'Input value not in range', refValues: [ 61,18,60 ] } });

        });



	      it('should not give error if the age value is 27 and input value lies in between 6-8 in projectDuration FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            '27':['age'],
            'projectDuration':[7],
          });
          expect(RxwebValidators.range({conditionalExpression:(x,y) => x.age >= 25 ,minimumNumber:18,maximumNumber:60})(formGroup.controls.projectDuration)).toBeNull();

        });

	      it('should not give error if the age value is 27 and input value lies in between 2-20 in experience FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            '27':['age'],
            'experience':[5],
          });
          expect(RxwebValidators.range({conditionalExpression:'x => x.age >=25',minimumNumber:18,maximumNumber:60})(formGroup.controls.experience)).toBeNull();

        });

	      it('should not give error if the age value is 24 and input value does not lie in between 6-8 in projectDuration FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            '24':['age'],
            'projectDuration':[4],
          });
          expect(RxwebValidators.range({conditionalExpression:(x,y) => x.age >= 25 ,minimumNumber:18,maximumNumber:60})(formGroup.controls.projectDuration)).toBeNull();

        });

	      it('should not give error if the age value is 24 and input value does not lie in between 2-20 in experience FormControl with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'age':[24],
            'experience':[1],
          });
          expect(RxwebValidators.range({conditionalExpression:'x => x.age >=25',minimumNumber:18,maximumNumber:60})(formGroup.controls.experience)).toBeNull();

        });


	      it('should give error if the age value is 27 and input value does not lie in between 6-8 in projectDuration FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'age':[27],
            'projectDuration':[4],
          });
          expect(RxwebValidators.range({conditionalExpression:(x,y) => x.age >= 25 ,minimumNumber:18,maximumNumber:60})(formGroup.controls.projectDuration)).toEqual({'range':{ message: 'Input value not in range', refValues: [ 4,18,60 ] } });

        });

	      it('should give error if the age value is 27 and input value does not lie in between 2-20 in experience FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'age':[27],
            'experience':[1],
          });
          expect(RxwebValidators.range({conditionalExpression:'x => x.age >=25',minimumNumber:18,maximumNumber:60})(formGroup.controls.experience)).toEqual({'range':{ message: 'Input value not in range', refValues: [ 1,18,60 ] } });

        });




	      it('should give error, if the control do not contains value in between the range',
        () => {
          expect(RxwebValidators.range({message:'Your Salary should be between 1000 to 200000.',minimumNumber:18,maximumNumber:60})(new FormControl(100))).toEqual({'range':{ message: 'Your Salary should be between 1000 to 200000.', refValues: [ 100,18,60 ] } });

        });



//end
    });
  });
})();

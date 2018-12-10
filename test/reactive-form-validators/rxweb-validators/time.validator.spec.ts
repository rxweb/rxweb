import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "time": "Please enter proper time format",
        }
      });
    });

    describe('time', () => {
      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.time()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.time()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.time()(new FormControl(undefined))).toBeNull(); 
        });

      it('should not give error on any time format value.',
        () => { 
          expect(RxwebValidators.time()(new FormControl('12:23'))).toBeNull(); 
        });

      it('should give error if the control contains value other than time format value.',
        () => { 
          expect(RxwebValidators.time()(new FormControl('44:44'))).toEqual({'time':{ message: 'Please enter proper time format', refValues: [ '44:44' ] } }); 
        });


	      it('should not give error if the entryPlace value is Lunch Room and time value in totalIn FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'entryPlace':['Lunch Room'],
            'totalIn':['12:23'],
          });
          expect(RxwebValidators.time({conditionalExpression:(x,y) => x.entryPlace == "Lunch Room" })(formGroup.controls.totalIn)).toBeNull();

        });

	      it('should not give error if the entryPlace value is Lunch Room and time value in totalIn FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'entryPlace':['Lunch Room'],
            'entryTime':['10:00'],
          });
          expect(RxwebValidators.time({conditionalExpression:'x => x.entryPlace == "Lunch Room"'})(formGroup.controls.entryTime)).toBeNull();

        });

	      it('should not give error if the entryPlace value is Home and non time value in totalIn FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'entryPlace':['Home'],
            'totalIn':['10'],
          });
          expect(RxwebValidators.time({conditionalExpression:(x,y) => x.entryPlace == "Lunch Room" })(formGroup.controls.totalIn)).toBeNull();

        });

	      it('should not give error if the entryPlace value is Home and non time value in totalIn FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'entryPlace':['Home'],
            'entryTime':['10'],
          });
          expect(RxwebValidators.time({conditionalExpression:'x => x.entryPlace == "Lunch Room"'})(formGroup.controls.entryTime)).toBeNull();

        });


	      it('should give error if the entryPlace value is Lunch Room and non time value in totalIn FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'entryPlace':['Lunch Room'],
            'totalIn':['12'],
          });
          expect(RxwebValidators.time({conditionalExpression:(x,y) => x.entryPlace == "Lunch Room" })(formGroup.controls.totalIn)).toEqual({'time':{ message: 'Please enter proper time format', refValues: [ '12' ] } });

        });

	      it('should give error if the entryPlace value is Lunch Room and non time value in totalIn FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'entryPlace':['Lunch Room'],
            'entryTime':['10'],
          });
          expect(RxwebValidators.time({conditionalExpression:'x => x.entryPlace == "Lunch Room"'})(formGroup.controls.entryTime)).toEqual({'time':{ message: 'Please enter proper time format', refValues: [ '10' ] } });

        });



	      it('should not give error, if the control contains any time value including seconds',
        () => {
          expect(RxwebValidators.time({allowSeconds:true})(new FormControl('12:23:44'))).toBeNull();

        });

	      it('should not give error, if the control contains any time value excluding seconds',
        () => {
          expect(RxwebValidators.time({allowSeconds:false})(new FormControl('12:23'))).toBeNull();

        });


	      it('should give error, if the control contains any time value excluding seconds',
        () => {
          expect(RxwebValidators.time({allowSeconds:true})(new FormControl('12:23'))).toEqual({'time':{ message: 'Please enter proper time format', refValues: [ '12:23' ] } });

        });

	      it('should give error, if the control contains any time value including seconds',
        () => {
          expect(RxwebValidators.time({allowSeconds:false})(new FormControl('12:23:44'))).toEqual({'time':{ message: 'Please enter proper time format', refValues: [ '12:23:44' ] } });

        });




	      it('should give error in any non time format value',
        () => {
          expect(RxwebValidators.time({message:'You can enter only time format data'})(new FormControl('44:44'))).toEqual({'time':{ message: 'You can enter only time format data', refValues: [ '44:44' ] } });

        });



//end
    });
  });
})();

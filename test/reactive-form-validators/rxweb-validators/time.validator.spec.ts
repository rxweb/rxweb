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

      it("Should not error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'entryPlace':['Lunch Room'],
            'totalIn':'12:30'
          });
          expect(RxwebValidators.time({conditionalExpression:(x,y) => x.entryPlace == "Lunch Room" })(formGroup.controls.totalIn)).toBeNull()
        });

      it("Should not error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'entryPlace':['Conference Room'],
            'totalIn':12
          });
          expect(RxwebValidators.time({conditionalExpression:(x,y) => x.entryPlace == "Lunch Room" })(formGroup.controls.totalIn)).toBeNull()
        });


      it("Should error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'entryPlace':['Lunch Room'],
            'totalIn':10
          });
          expect(RxwebValidators.time({conditionalExpression:(x,y) => x.entryPlace == "Lunch Room" })(formGroup.controls.totalIn)).toEqual({'time':{ message: 'Please enter proper time format', refValues: [ 10 ] } }); 
        });

      it("Should not error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'entryPlace':['Lunch Room'],
            'entryTime':'10:00'
          });
          expect(RxwebValidators.time({conditionalExpression:'x => x.entryPlace == "Lunch Room"'})(formGroup.controls.entryTime)).toBeNull()
        });

      it("Should not error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'entryPlace':['HR Cabin'],
            'entryTime':10
          });
          expect(RxwebValidators.time({conditionalExpression:'x => x.entryPlace == "Lunch Room"'})(formGroup.controls.entryTime)).toBeNull()
        });


      it("Should error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'entryPlace':['Lunch Room'],
            'entryTime':13
          });
          expect(RxwebValidators.time({conditionalExpression:'x => x.entryPlace == "Lunch Room"'})(formGroup.controls.entryTime)).toEqual({'time':{ message: 'Please enter proper time format', refValues: [ 13 ] } }); 
        });




      it("Should error, Allow seconds.",
        () => { 
          expect(RxwebValidators.time({allowSeconds:true})(new FormControl('12:23'))).toEqual({'time':{ message: 'Please enter proper time format', refValues: [ '12:23' ] } }); 
        });


      it("Should error, Shows Custom Validation Message.",
        () => { 
          expect(RxwebValidators.time({message:'You can enter only time format data'})(new FormControl(10))).toEqual({'time':{ message: 'You can enter only time format data', refValues: [ 10 ] } }); 
        });



	//end
    });
  });
})();


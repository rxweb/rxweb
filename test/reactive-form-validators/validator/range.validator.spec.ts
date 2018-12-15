import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';



(function() {
  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "range": "Input value not in range",
        }
      });
    });

    describe('rangeValidator', () => {

	      it("Should not error, range validator If you want to apply conditional validation on 'Project Duration' or 'Employee Experience', then you need to add 'Employee Age' input greater than 25",
        () => { 
          expect(RxwebValidators.range({minimumNumber:18,maximumNumber:60})(new FormControl(20))).toBeNull(); 
        });


      it("Should error, range validator If you want to apply conditional validation on 'Project Duration' or 'Employee Experience', then you need to add 'Employee Age' input greater than 25",
        () => { 
          expect(RxwebValidators.range({minimumNumber:18,maximumNumber:60})(new FormControl(10))).toEqual({'range':{ message: 'Input value not in range', refValues: [ 10,18,60 ] } }); 
        });


      it("Should not error, range validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'age':[30],
            'projectDuration':7
          });
          expect(RxwebValidators.range({minimumNumber:6,maximumNumber:8,conditionalExpression:(x,y) => x.age >= 25 })(formGroup.controls.projectDuration)).toBeNull()
        });

      it("Should not error, range validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'age':[20],
            'projectDuration':9
          });
          expect(RxwebValidators.range({minimumNumber:6,maximumNumber:8,conditionalExpression:(x,y) => x.age >= 25 })(formGroup.controls.projectDuration)).toBeNull()
        });


      it("Should error,  range validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'age':[30],
            'projectDuration':5
          });
          expect(RxwebValidators.range({minimumNumber:6,maximumNumber:8,conditionalExpression:(x,y) => x.age >= 25 })(formGroup.controls.projectDuration)).toEqual({'range':{ message: 'Input value not in range', refValues: [ 5,6,8 ] } }); 
        });


      it("Should not error, range validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'age':[26],
            'experience':10
          });
          expect(RxwebValidators.range({minimumNumber:2,maximumNumber:20,conditionalExpression:'x => x.age >=25'})(formGroup.controls.experience)).toBeNull()
        });

      it("Should not error, range validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'age':[20],
            'experience':1
          });
          expect(RxwebValidators.range({minimumNumber:2,maximumNumber:20,conditionalExpression:'x => x.age >=25'})(formGroup.controls.experience)).toBeNull()
        });


      it("Should error,  range validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'age':[27],
            'experience':25
          });
          expect(RxwebValidators.range({minimumNumber:2,maximumNumber:20,conditionalExpression:'x => x.age >=25'})(formGroup.controls.experience)).toEqual({'range':{ message: 'Input value not in range', refValues: [ 25,2,20 ] } }); 
        });


      it("Should not error, range validator Please enter salary between 1000 to 200000",
        () => { 
          expect(RxwebValidators.range({minimumNumber:1000,maximumNumber:200000,message:'Your Salary should be between 1000 to 200000.'})(new FormControl(1001))).toBeNull(); 
        });


      it("Should error, range validator Please enter salary between 1000 to 200000",
        () => { 
          expect(RxwebValidators.range({minimumNumber:1000,maximumNumber:200000,message:'Your Salary should be between 1000 to 200000.'})(new FormControl(20000000))).toEqual({'range':{ message: 'Your Salary should be between 1000 to 200000.', refValues: [ 20000000,1000,200000 ] } }); 
        });




	//end
    });
  });
})();

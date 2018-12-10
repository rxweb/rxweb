import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "required": "This field is required",
        }
      });
    });

    describe('required', () => {

      it('should not give error, if the control contains any value',
        () => { 
          expect(RxwebValidators.required()(new FormControl('Bharat'))).toBeNull(); 
        });

      it('should give error, if the control contains empty value',
        () => { 
          expect(RxwebValidators.required()(new FormControl())).toEqual({'required':{ message: 'This field is required', refValues: [  ] } }); 
        });


	      it('should not give error if the firstName value is Bharat and any value in middleName FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'firstName':["Bharat"],
            'middleName':['Rajesh'],
          });
          expect(RxwebValidators.required({conditionalExpression:(x,y) => x.firstName == "Bharat" })(formGroup.controls.middleName)).toBeNull();

        });

	      it('should not give error if the firstName value is Bharat and any value in lastName FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'firstName':['Bharat'],
            'lastName':['Raghuvanshi'],
          });
          expect(RxwebValidators.required({conditionalExpression:'x => x.firstName == "Bharat"'})(formGroup.controls.lastName)).toBeNull();

        });

	      it('should not give error if the firstName value is Mahesh and empty value in middleName FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'firstName':['Mahesh'],
            'middleName':[],
          });
          expect(RxwebValidators.required({conditionalExpression:(x,y) => x.firstName == "Bharat" })(formGroup.controls.middleName)).toBeNull();

        });

	      it('should not give error if the firstName value is Mahesh and empty value in lastName FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'firstName':['Mahesh'],
            'lastName':[],
          });
          expect(RxwebValidators.required({conditionalExpression:'x => x.firstName == "Bharat"'})(formGroup.controls.lastName)).toBeNull();

        });


	      it('should give error if the firstName value is Bharat and empty value in middleName FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'firstName':['Bharat'],
            'middleName':[],
          });
          expect(RxwebValidators.required({conditionalExpression:(x,y) => x.firstName == "Bharat" })(formGroup.controls.middleName)).toEqual({'required':{ message: 'This field is required', refValues: [  ] } });

        });

	      it('should give error if the firstName value is Bharat and empty value in lastName FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'firstName':['Bharat'],
            'lastName':[],
          });
          expect(RxwebValidators.required({conditionalExpression:'x => x.firstName == "Bharat"'})(formGroup.controls.lastName)).toEqual({'required':{ message: 'This field is required', refValues: [  ] } });

        });




	      it('should give error, if the control contains empty value',
        () => {
          expect(RxwebValidators.required({message:'Username cannot be blank.'})(new FormControl())).toEqual({'required':{ message: 'Username cannot be blank.', refValues: [  ] } });

        });



//end
    });
  });
})();

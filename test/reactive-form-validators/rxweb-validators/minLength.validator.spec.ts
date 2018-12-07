import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "minLength": "Minimum length is not matched",
        }
      });
    });

    describe('minLength', () => {
      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.minLength({value:3,})(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.minLength({value:3,})(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.minLength({value:3,})(new FormControl(undefined))).toBeNull(); 
        });

      it('should not give error, if the control contains any value length greater than 3',
        () => { 
          expect(RxwebValidators.minLength({value:3,})(new FormControl('India'))).toBeNull(); 
        });

      it('should give error, if the control contains any value length less than 3',
        () => { 
          expect(RxwebValidators.minLength({value:3,})(new FormControl('UK'))).toEqual({'minLength':{ message: 'Minimum length is not matched', refValues: [ 'UK',3 ] } }); 
        });


	      it('should not give error, if the control contains value length greater than 10 ',
        () => {
          expect(RxwebValidators.minLength({value:10})(new FormControl(9877986857))).toBeNull();

        });

	      it('should not give error, if the control contains value length greater than 8',
        () => {
          expect(RxwebValidators.minLength({value:8})(new FormControl('0294-2453671'))).toBeNull();

        });

	      it('should not give error, if the control contains value length greater than 3',
        () => {
          expect(RxwebValidators.minLength({value:3})(new FormControl('+91'))).toBeNull();

        });

	      it('should not give error, if the control contains value length greater than 3',
        () => {
          expect(RxwebValidators.minLength({value:3})(new FormControl('0294'))).toBeNull();

        });


	      it('should give error, if the control contains value length less than 10 ',
        () => {
          expect(RxwebValidators.minLength({value:10})(new FormControl(9877986))).toEqual({'minLength':{ message: 'Minimum length is not matched', refValues: [ 9877986,10 ] } });

        });

	      it('should give error, if the control contains value length less than 8',
        () => {
          expect(RxwebValidators.minLength({value:8})(new FormControl(253671))).toEqual({'minLength':{ message: 'Minimum length is not matched', refValues: [ 253671,8 ] } });

        });

	      it('should give error, if the control contains value length less than 3',
        () => {
          expect(RxwebValidators.minLength({value:3})(new FormControl('+1'))).toEqual({'minLength':{ message: 'Minimum length is not matched', refValues: [ '+1',3 ] } });

        });

	      it('should give error, if the control contains value length less than 3',
        () => {
          expect(RxwebValidators.minLength({value:3})(new FormControl(94))).toEqual({'minLength':{ message: 'Minimum length is not matched', refValues: [ 94,3 ] } });

        });




	      it('should give error, if the control contains value length less than 8',
        () => {
          expect(RxwebValidators.minLength({message:'Minimum 8 characters are allowed',value:3})(new FormControl(25))).toEqual({'minLength':{ message: 'Minimum 8 characters are allowed', refValues: [ 25,3 ] } });

        });



	      it('should not give error if the countryName value is India and value length greater than 3 in countryCode FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'countryName':['India'],
            'countryCode':['+91'],
          });
          expect(RxwebValidators.minLength({conditionalExpression:(x,y)=> x.countryName == "India",value:3})(formGroup.controls.countryCode)).toBeNull();

        });

	      it('should not give error if the countryName value is India and value length greater than 3 in stateCode FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'countryName':['India'],
            'stateCode':['0294'],
          });
          expect(RxwebValidators.minLength({conditionalExpression:'x => x.countryName == "India"',value:3})(formGroup.controls.stateCode)).toBeNull();

        });

	      it('should not give error if the countryName value is Australia and value length less than 3 in countryCode FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'countryName':['Australia'],
            'countryCode':['91'],
          });
          expect(RxwebValidators.minLength({conditionalExpression:(x,y)=> x.countryName == "India",value:3})(formGroup.controls.countryCode)).toBeNull();

        });

	      it('should not give error if the countryName value is Australia and value length less than 3 in stateCode FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'countryName':['Australia'],
            'stateCode':['94'],
          });
          expect(RxwebValidators.minLength({conditionalExpression:'x => x.countryName == "India"',value:3})(formGroup.controls.stateCode)).toBeNull();

        });


	      it('should give error if the countryName value is India and value length less than 3 in countryCode FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'countryName':['India'],
            'countryCode':['91'],
          });
          expect(RxwebValidators.minLength({conditionalExpression:(x,y)=> x.countryName == "India",value:3})(formGroup.controls.countryCode)).toEqual({'minLength':{ message: 'Minimum length is not matched', refValues: [ '91',3 ] } });

        });

	      it('should give error if the countryName value is India and value length less than 3 in stateCode FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'countryName':['India'],
            'stateCode':['94'],
          });
          expect(RxwebValidators.minLength({conditionalExpression:'x => x.countryName == "India"',value:3})(formGroup.controls.stateCode)).toEqual({'minLength':{ message: 'Minimum length is not matched', refValues: [ '94',3 ] } });

        });



//end
    });
  });
})();

import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "leapYear": "Please enter a valid leap year",
        }
      });
    });

    describe('leapYear', () => {
      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.leapYear()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.leapYear()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.leapYear()(new FormControl(undefined))).toBeNull(); 
        });

      it('should not give error on control which contains value which is proper leapYear.',
        () => { 
          expect(RxwebValidators.leapYear()(new FormControl('2008'))).toBeNull(); 
        });

      it('should give error on control which contains value which is not proper leapYear.',
        () => { 
          expect(RxwebValidators.leapYear()(new FormControl('2007'))).toEqual({'leapYear':{ message: 'Please enter a valid leap year', refValues: [ '2007' ] } }); 
        });


	      it('should not give error if the name value is Bharat in birthYear FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name':['Bharat'],
            'birthYear':['2004'],
          });
          expect(RxwebValidators.leapYear({conditionalExpression:(x,y) => x.name == "Bharat" })(formGroup.controls.birthYear)).toBeNull();

        });

	      it('should not give error if the name value is Bharat in admissionYear FormControl with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name':['Bharat'],
            'admissionYear':['2008'],
          });
          expect(RxwebValidators.leapYear({conditionalExpression:'x => x.name == "Bharat"'})(formGroup.controls.admissionYear)).toBeNull();

        });

	      it('should not give error if the name value is Naman and value in birthYear is not leapyear with FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name':['Naman'],
            'birthYear':['2015'],
          });
          expect(RxwebValidators.leapYear({conditionalExpression:(x,y) => x.name == "Bharat" })(formGroup.controls.birthYear)).toBeNull();

        });

	      it('should not give error if the name value is Naman and value in birthYear is not leapyear with FormControl with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name':['Naman'],
            'birthYear':['2007'],
          });
          expect(RxwebValidators.leapYear({conditionalExpression:'x => x.name == "Bharat"'})(formGroup.controls.birthYear)).toBeNull();

        });


	      it('should give error if the name value is Bharat and value in birthYear FormControl is not valid leapYear with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name':['Bharat'],
            'birthYear':['2015'],
          });
          expect(RxwebValidators.leapYear({conditionalExpression:(x,y) => x.name == "Bharat" })(formGroup.controls.birthYear)).toEqual({'leapYear':{ message: 'Please enter a valid leap year', refValues: [ '2015' ] } });

        });

	      it('should give error if the name value is Bharat and value in admissionYear FormControl is not valid leapYear with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name':['Bharat'],
            'admissionYear':['2007'],
          });
          expect(RxwebValidators.leapYear({conditionalExpression:'x => x.name == "Bharat"'})(formGroup.controls.admissionYear)).toEqual({'leapYear':{ message: 'Please enter a valid leap year', refValues: [ '2007' ] } });

        });




	      it('should give error if the control conatins value which is not valid leap year.',
        () => {
          expect(RxwebValidators.leapYear({message:'{{0}} is not a leap year'})(new FormControl('2013'))).toEqual({'leapYear':{ message: '2013 is not a leap year', refValues: [ '2013' ] } });

        });



//end
    });
  });
})();

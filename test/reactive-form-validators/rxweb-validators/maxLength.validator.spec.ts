import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "maxLength": "Maximum Length is not matched",
        }
      });
    });

    describe('maxLength', () => {

      it('should not give error on control which contains value which is less than 10.',
        () => { 
          expect(RxwebValidators.maxLength({value:16,})(new FormControl('Bharat'))).toBeNull(); 
        });

      it('should give error on control which contains value which is not less than 10.',
        () => { 
          expect(RxwebValidators.maxLength({value:16,})(new FormControl('Bharatttttttttttt'))).toEqual({'maxLength':{ message: 'Maximum Length is not matched', refValues: [ 'Bharatttttttttttt',16 ] } }); 
        });


	      it('should not give error if the length of control is maximum of 16',
        () => {
          expect(RxwebValidators.maxLength({value:16})(new FormControl('Bharat'))).toBeNull();

        });


	      it('should give error if the length of control is more than 16',
        () => {
          expect(RxwebValidators.maxLength({value:16})(new FormControl('Alyhasanjonathany'))).toEqual({'maxLength':{ message: 'Maximum Length is not matched', refValues: [ 'Alyhasanjonathany',16 ] } });

        });



	      it('should not give error if the firstName value is Bharat in middleName FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'firstName':['Bharat'],
            'middleName':['Bharat'],
          });
          expect(RxwebValidators.maxLength({conditionalExpression:(x,y)=> x.firstName == "Bharat",value:16})(formGroup.controls.middleName)).toBeNull();

        });

	      it('should not give error if the firstName value is Bharat in lastName FormControl with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'firstName':['Bharat'],
            'lastName':['Shah'],
          });
          expect(RxwebValidators.maxLength({conditionalExpression:'x => x.firstName == "Bharat"',value:16})(formGroup.controls.lastName)).toBeNull();

        });

	      it('should not give error if the firstName value is Naman and value in middleName FormControl is more than 16 with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'firstName':['Naman'],
            'middleName':['DAgfvdsvgfsffffffffffffffffffff'],
          });
          expect(RxwebValidators.maxLength({conditionalExpression:(x,y)=> x.firstName == "Bharat",value:16})(formGroup.controls.middleName)).toBeNull();

        });

	      it('should not give error if the firstName value is Naman and value in lastName FormControl is more than 16 with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'firstName':['Naman'],
            'lastName':['jhnrithortihtigheihihiiiii'],
          });
          expect(RxwebValidators.maxLength({conditionalExpression:'x => x.firstName == "Bharat"',value:16})(formGroup.controls.lastName)).toBeNull();

        });


	      it('should give error if the firstName value is Bharat and value in middleName FormControl is more than 16 with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'firstName':['Bharat'],
            'middleName':['DAgfvdsvgfsffffffffffffffffffff'],
          });
          expect(RxwebValidators.maxLength({conditionalExpression:(x,y)=> x.firstName == "Bharat",value:16})(formGroup.controls.middleName)).toEqual({'maxLength':{ message: 'Maximum Length is not matched', refValues: [ 'DAgfvdsvgfsffffffffffffffffffff',16 ] } });

        });

	      it('should give error if the firstName value is Bharat and value in lastName FormControl is more than 16 with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'firstName':['Bharat'],
            'lastName':['jhnrithortihtigheihihiiiii'],
          });
          expect(RxwebValidators.maxLength({conditionalExpression:'x => x.firstName == "Bharat"',value:16})(formGroup.controls.lastName)).toEqual({'maxLength':{ message: 'Maximum Length is not matched', refValues: [ 'jhnrithortihtigheihihiiiii',16 ] } });

        });




	      it('should give error if the control conatins value which is having length more than 10.',
        () => {
          expect(RxwebValidators.maxLength({message:'Maximum 10 characters are allowed',value:16})(new FormControl('rameshoushdfwjfdjhndfhnjd'))).toEqual({'maxLength':{ message: 'Maximum 10 characters are allowed', refValues: [ 'rameshoushdfwjfdjhndfhnjd',16 ] } });

        });



//end
    });
  });
})();

import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "lowerCase": "Only lower case are allowed.",
        }
      });
    });

    describe('lowerCase', () => {
      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.lowerCase()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.lowerCase()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.lowerCase()(new FormControl(undefined))).toBeNull(); 
        });

      it('should not give error on control which contains value which is lowerCase.',
        () => { 
          expect(RxwebValidators.lowerCase()(new FormControl('jonathan.feldman'))).toBeNull(); 
        });

      it('should give error if the control conatins value which is not lowerCase.',
        () => { 
          expect(RxwebValidators.lowerCase()(new FormControl('Bharat.shah'))).toEqual({'lowerCase':{ message: 'Only lower case are allowed.', refValues: [ 'Bharat.shah' ] } }); 
        });


	      it('should not give error if the username value is jonathan.feldman in firstName FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'username':['jonathan.feldman'],
            'firstName':['bharat.shah'],
          });
          expect(RxwebValidators.lowerCase({conditionalExpression:(x,y) =>  x.username == "jonathan.feldman" })(formGroup.controls.firstName)).toBeNull();

        });

	      it('should not give error if the continent value is jonathan.feldman in middleName FormControl with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'username':['jonathan.feldman'],
            'middleName':['mahesh.kumar'],
          });
          expect(RxwebValidators.lowerCase({conditionalExpression:'x => x.username == "jonathan.feldman"'})(formGroup.controls.middleName)).toBeNull();

        });

	      it('should not give error if the username value is jonathan.felman and value in username FormControl is not lowercase with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'username':['jonathan.felman'],
            'fullName':['Bharat.shah'],
          });
          expect(RxwebValidators.lowerCase({conditionalExpression:(x,y) =>  x.username == "jonathan.feldman" })(formGroup.controls.fullName)).toBeNull();

        });

	      it('should not give error if the middleName value is jonathan.felman and value in middleName FormControl is not lowercase with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'username':['jonathan.felman'],
            'middleName':['Bharat.shah'],
          });
          expect(RxwebValidators.lowerCase({conditionalExpression:'x => x.username == "jonathan.feldman"'})(formGroup.controls.middleName)).toBeNull();

        });


	      it('should not give error if the username value is jonathan.feldman in firstName FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'username':['jonathan.feldman'],
            'firstName':['Bharat.shah'],
          });
          expect(RxwebValidators.lowerCase({conditionalExpression:(x,y) =>  x.username == "jonathan.feldman" })(formGroup.controls.firstName)).toEqual({'lowerCase':{ message: 'Only lower case are allowed.', refValues: [ 'Bharat.shah' ] } });

        });

	      it('should not give error if the username value is jonathan.feldman in middleName FormControl with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'username':['jonathan.feldman'],
            'middleName':['Bharat.shah'],
          });
          expect(RxwebValidators.lowerCase({conditionalExpression:'x => x.username == "jonathan.feldman"'})(formGroup.controls.middleName)).toEqual({'lowerCase':{ message: 'Only lower case are allowed.', refValues: [ 'Bharat.shah' ] } });

        });




	      it('should give error if the control conatins value which is not lowerCase.',
        () => {
          expect(RxwebValidators.lowerCase({message:'You can enter only lowerCase letters.'})(new FormControl('Shah'))).toEqual({'lowerCase':{ message: 'You can enter only lowerCase letters.', refValues: [ 'Shah' ] } });

        });



//end
    });
  });
})();

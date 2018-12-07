import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "maxNumber": "Maximum number is not matched.",
        }
      });
    });

    describe('maxNumber', () => {
      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.maxNumber({value:100,})(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.maxNumber({value:100,})(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.maxNumber({value:100,})(new FormControl(undefined))).toBeNull(); 
        });

      it('should not give error on control which contains value which is not more than maxNumber.',
        () => { 
          expect(RxwebValidators.maxNumber({value:100,})(new FormControl('40'))).toBeNull(); 
        });

      it('should give error on control which contains value which is more than maxNumber.',
        () => { 
          expect(RxwebValidators.maxNumber({value:100,})(new FormControl('105'))).toEqual({'maxNumber':{ message: 'Maximum number is not matched.', refValues: [ '105',100 ] } }); 
        });


	      it('Should not give error if the value in control has maximum 100',
        () => {
          expect(RxwebValidators.maxNumber({value:100})(new FormControl('100'))).toBeNull();

        });

	      it('Should not give error if the value in control has maximum 100',
        () => {
          expect(RxwebValidators.maxNumber({value:100})(new FormControl('77'))).toBeNull();

        });

	      it('Should not give error if the value in control has maximum 50',
        () => {
          expect(RxwebValidators.maxNumber({value:50})(new FormControl('50'))).toBeNull();

        });


	      it('Should give error if the value in control has value more than 100',
        () => {
          expect(RxwebValidators.maxNumber({value:100})(new FormControl('101'))).toEqual({'maxNumber':{ message: 'Maximum number is not matched.', refValues: [ '101',100 ] } });

        });

	      it('Should give error if the value in control has value more than 100',
        () => {
          expect(RxwebValidators.maxNumber({value:100})(new FormControl('105'))).toEqual({'maxNumber':{ message: 'Maximum number is not matched.', refValues: [ '105',100 ] } });

        });

	      it('Should give error if the value in control has value more than 50',
        () => {
          expect(RxwebValidators.maxNumber({value:50})(new FormControl('55'))).toEqual({'maxNumber':{ message: 'Maximum number is not matched.', refValues: [ '55',50 ] } });

        });



	      it('should not give error if the subjectCode value is 8CS5A in maximumMarks FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'subjectCode':['8CS5A'],
            'maximumMarks':['100'],
          });
          expect(RxwebValidators.maxNumber({conditionalExpression:(x,y) => x.subjectCode == "8CS5A" ,value:100})(formGroup.controls.maximumMarks)).toBeNull();

        });

	      it('should not give error if the subjectCode value is 8CS5A and value in obtainedMarks FormControl  with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'subjectCode':['8CS5A'],
            'obtainedMarks':['50'],
          });
          expect(RxwebValidators.maxNumber({conditionalExpression:'x => x.subjectCode == "8CS5A"',value:100})(formGroup.controls.obtainedMarks)).toBeNull();

        });

	      it('should not give error if the subjectCode value is 8CS5E and value in maximumMarks FormControl is more than maxNumber with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'subjectCode':['8CS5E'],
            'maximumMarks':['101'],
          });
          expect(RxwebValidators.maxNumber({conditionalExpression:(x,y) => x.subjectCode == "8CS5A" ,value:100})(formGroup.controls.maximumMarks)).toBeNull();

        });

	      it('should not give error if the subjectCode value is 8CS5E and value in obtainedMarks FormControl is more than maxNumber with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'subjectCode':['8CS5E'],
            'obtainedMarks':['105'],
          });
          expect(RxwebValidators.maxNumber({conditionalExpression:'x => x.subjectCode == "8CS5A"',value:100})(formGroup.controls.obtainedMarks)).toBeNull();

        });


	      it('should give error if the subjectCode value is 8CS5A and value in maximumMarks FormControl is is more than maxNumber with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'subjectCode':['8CS5A'],
            'maximumMarks':['101'],
          });
          expect(RxwebValidators.maxNumber({conditionalExpression:(x,y) => x.subjectCode == "8CS5A" ,value:100})(formGroup.controls.maximumMarks)).toEqual({'maxNumber':{ message: 'Maximum number is not matched.', refValues: [ '101',100 ] } });

        });

	      it('should give error if the subjectCode value is 8CS5A and value in obtainedMarks FormControl is is more than maxNumber with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'subjectCode':['8CS5A'],
            'obtainedMarks':['105'],
          });
          expect(RxwebValidators.maxNumber({conditionalExpression:'x => x.subjectCode == "8CS5A"',value:100})(formGroup.controls.obtainedMarks)).toEqual({'maxNumber':{ message: 'Maximum number is not matched.', refValues: [ '105',100 ] } });

        });




	      it('should give error if the control conatins value which is more than maxNumber.',
        () => {
          expect(RxwebValidators.maxNumber({message:'{{0}} exceeds the Maximum marks Limit',value:100})(new FormControl('105'))).toEqual({'maxNumber':{ message: '105 exceeds the Maximum marks Limit', refValues: [ '105',100 ] } });

        });



//end
    });
  });
})();

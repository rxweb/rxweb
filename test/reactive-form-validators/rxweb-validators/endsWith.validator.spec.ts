import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "endsWith": "Input must ends with a pre defined value",
        }
      });
    });

    describe('endsWith', () => {

      it('should not give error on control which contains value which ends with the t.',
        () => { 
          expect(RxwebValidators.endsWith({value:'t',})(new FormControl('Bharat'))).toBeNull(); 
        });

      it('should give error on control which contains value which does not end with t.',
        () => { 
          expect(RxwebValidators.endsWith({value:'t',})(new FormControl('Naman'))).toEqual({'endsWith':{ message: 'Input must ends with a pre defined value', refValues: [ 'Naman','t' ] } }); 
        });


	      it('should not give error if the value in the FormControl ends with t',
        () => {
          expect(RxwebValidators.endsWith({value:'t'})(new FormControl('Bharat'))).toBeNull();

        });


	      it('should give error if the value in the FormControl does not end wih t',
        () => {
          expect(RxwebValidators.endsWith({value:'t'})(new FormControl('Naman'))).toEqual({'endsWith':{ message: 'Input must ends with a pre defined value', refValues: [ 'Naman','t' ] } });

        });




	      it('should give error if the control contains value which does not end with t',
        () => {
          expect(RxwebValidators.endsWith({message:'{{0}} does not ends with `t`',value:'t'})(new FormControl('Naman'))).toEqual({'endsWith':{ message: 'Naman does not ends with `t`', refValues: [ 'Naman','t' ] } });

        });



	      it('should not give error if the name value is Bharat in profession FormControl ends with t with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name':['Bharat'],
            'profession':['dentist'],
          });
          expect(RxwebValidators.endsWith({conditionalExpression:(x,y) => x.name == "Bharat" ,value:'t'})(formGroup.controls.profession)).toBeNull();

        });

	      it('should not give error if the name is Bharat in taskId FormControl ends with t with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name':['Bharat'],
            'taskId':['12233t'],
          });
          expect(RxwebValidators.endsWith({conditionalExpression:'x => x.name =="Bharat"',value:'t'})(formGroup.controls.taskId)).toBeNull();

        });

	      it('should not give error if the name value is Naman and value in profession FormControl does not end with r with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name':['Naman'],
            'profession':['Architect'],
          });
          expect(RxwebValidators.endsWith({conditionalExpression:(x,y) => x.name == "Bharat" ,value:'t'})(formGroup.controls.profession)).toBeNull();

        });

	      it('should not give error if the name value is Naman in taskId FormControl does not end with # with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name':['Naman'],
            'taskId':['12233'],
          });
          expect(RxwebValidators.endsWith({conditionalExpression:'x => x.name =="Bharat"',value:'t'})(formGroup.controls.taskId)).toBeNull();

        });


	      it('should give error if the name value is Bharat and value in profession FormControl does not end with r with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name':['Bharat'],
            'profession':['engineer'],
          });
          expect(RxwebValidators.endsWith({conditionalExpression:(x,y) => x.name == "Bharat" ,value:'t'})(formGroup.controls.profession)).toEqual({'endsWith':{ message: 'Input must ends with a pre defined value', refValues: [ 'engineer','t' ] } });

        });

	      it('should give error if the name value is Bharat and value in taskId FormControl does not end with # with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name':['Bharat'],
            'taskId':['1234'],
          });
          expect(RxwebValidators.endsWith({conditionalExpression:'x => x.name =="Bharat"',value:'t'})(formGroup.controls.taskId)).toEqual({'endsWith':{ message: 'Input must ends with a pre defined value', refValues: [ '1234','t' ] } });

        });



//end
    });
  });
})();

import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "startsWith": "Input must starts with a pre defined value",
        }
      });
    });

    describe('startsWith', () => {




	      it('should not give error if the control contains any value starting with B.',
        () => {
          expect(RxwebValidators.startsWith({value:'B'})(new FormControl('Bharat'))).toBeNull();

        });


	      it('should give error if the control contains any value which do not starts with B.',
        () => {
          expect(RxwebValidators.startsWith({value:'B'})(new FormControl('Mahesh'))).toEqual({'startsWith':{ message: 'Input must starts with a pre defined value', refValues: [ 'Mahesh','B' ] } });

        });




	      it('should give error if the control contains any value which do not starts with B.',
        () => {
          expect(RxwebValidators.startsWith({message:'{{0}} does not starts with `B`',value:'B'})(new FormControl('Mahesh'))).toEqual({'startsWith':{ message: 'Mahesh does not starts with `B`', refValues: [ 'Mahesh','B' ] } });

        });



	      it('should not give error if the name value is Bharat and input value which starts with B in profession FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name':['Bharat'],
            'profession':['Business Analyst'],
          });
          expect(RxwebValidators.startsWith({conditionalExpression:(x,y) => x.name == "Bharat" ,value:'B'})(formGroup.controls.profession)).toBeNull();

        });

	      it('should not give error if the name value is Bharat and input value which starts with B in taskId FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name':['Bharat'],
            'taskId':['B12064'],
          });
          expect(RxwebValidators.startsWith({conditionalExpression:'x => x.name =="Bharat"',value:'B'})(formGroup.controls.taskId)).toBeNull();

        });

	      it('should not give error if the name value is Mahesh and input value which does not start with B in profession FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name':['Mahesh'],
            'profession':['Business Analyst'],
          });
          expect(RxwebValidators.startsWith({conditionalExpression:(x,y) => x.name == "Bharat" ,value:'B'})(formGroup.controls.profession)).toBeNull();

        });

	      it('should not give error if the name value is Mahesh and input value which does not start with # in taskId FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name':['Mahesh'],
            'taskId':['12064'],
          });
          expect(RxwebValidators.startsWith({conditionalExpression:'x => x.name =="Bharat"',value:'B'})(formGroup.controls.taskId)).toBeNull();

        });


	      it('should give error if the name value is Bharat and input value which does not start with Senior in profession FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name':['Bharat'],
            'profession':['Software Engineer'],
          });
          expect(RxwebValidators.startsWith({conditionalExpression:(x,y) => x.name == "Bharat" ,value:'B'})(formGroup.controls.profession)).toEqual({'startsWith':{ message: 'Input must starts with a pre defined value', refValues: [ 'Software Engineer','B' ] } });

        });

	      it('should give error if the name value is Bharat and input value which does not start with # in taskId FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'name':['Bharat'],
            'taskId':['12064'],
          });
          expect(RxwebValidators.startsWith({conditionalExpression:'x => x.name =="Bharat"',value:'B'})(formGroup.controls.taskId)).toEqual({'startsWith':{ message: 'Input must starts with a pre defined value', refValues: [ '12064','B' ] } });

        });



//end
    });
  });
})();

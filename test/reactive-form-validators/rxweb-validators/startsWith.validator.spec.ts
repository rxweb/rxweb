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

	      it("Should not error, ",
        () => { 
          expect(RxwebValidators.startsWith({value:'B'})(new FormControl('Bharat'))).toBeNull(); 
        });


      it("Should error, ",
        () => { 
          expect(RxwebValidators.startsWith({value:'B'})(new FormControl('Mahesh'))).toEqual({'startsWith':{ message: 'Input must starts with a pre defined value', refValues: [ 'Mahesh','B' ] } }); 
        });

      it("Should not error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'name':['Bharat'],
            'profession':'Senior Software Engineer'
          });
          expect(RxwebValidators.startsWith({value:'Senior',conditionalExpression:(x,y) => x.name == "Bharat" })(formGroup.controls.profession)).toBeNull()
        });

      it("Should not error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'name':['Bhuvan'],
            'profession':'Software Engineer'
          });
          expect(RxwebValidators.startsWith({value:'Senior',conditionalExpression:(x,y) => x.name == "Bharat" })(formGroup.controls.profession)).toBeNull()
        });


      it("Should error, Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'name':['Bharat'],
            'profession':'Project Manager'
          });
          expect(RxwebValidators.startsWith({value:'Senior',conditionalExpression:(x,y) => x.name == "Bharat" })(formGroup.controls.profession)).toEqual({'startsWith':{ message: 'Input must starts with a pre defined value', refValues: [ 'Project Manager','Senior' ] } }); 
        });

      it("Should not error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'name':['Bharat'],
            'taskId':'#12856'
          });
          expect(RxwebValidators.startsWith({value:'#',conditionalExpression:'x => x.name =="Bharat"'})(formGroup.controls.taskId)).toBeNull()
        });

      it("Should not error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'name':['Bhuvan'],
            'taskId':24673
          });
          expect(RxwebValidators.startsWith({value:'#',conditionalExpression:'x => x.name =="Bharat"'})(formGroup.controls.taskId)).toBeNull()
        });


      it("Should error, Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'name':['Bharat'],
            'taskId':16345
          });
          expect(RxwebValidators.startsWith({value:'#',conditionalExpression:'x => x.name =="Bharat"'})(formGroup.controls.taskId)).toEqual({'startsWith':{ message: 'Input must starts with a pre defined value', refValues: [ 16345,'#' ] } }); 
        });

      it("Should not error, Shows custom message",
        () => { 
          expect(RxwebValidators.startsWith({value:'R',message:'{{0}} does not starts with `R`'})(new FormControl('Reliance Industries'))).toBeNull(); 
        });


      it("Should error, Shows custom message",
        () => { 
          expect(RxwebValidators.startsWith({value:'R',message:'{{0}} does not starts with `R`'})(new FormControl('Microsoft Corporation'))).toEqual({'startsWith':{ message: 'Microsoft Corporation does not starts with `R`', refValues: [ 'Microsoft Corporation','R' ] } }); 
        });
	//end
    });
  });
})();


import {FormBuilder, FormControl} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '@rxweb/reactive-form-validators';



  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "startsWith": "Input must starts with a pre defined value",
        }
      });
    });

    describe('startsWithValidator', () => {

	      it("Should not error, startsWith validator ",
        () => { 
          expect(RxwebValidators.startsWith({value:'B'})(new FormControl('Bharat'))).toBeNull(); 
        });


      it("Should error, startsWith validator ",
        () => { 
          expect(RxwebValidators.startsWith({value:'B'})(new FormControl('Mahesh'))).toEqual({'startsWith':{ message: 'Input must starts with a pre defined value', refValues: [ 'Mahesh','B' ] } }); 
        });


      it("Should not error, startsWith validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'name':['Bharat'],
            'profession':'Senior Software Engineer'
          });
          expect(RxwebValidators.startsWith({value:'Senior',conditionalExpression:(x,y) => x.name == "Bharat" })(formGroup.controls.profession)).toBeNull()
        });

      it("Should not error, startsWith validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'name':['Bhuvan'],
            'profession':'Software Engineer'
          });
          expect(RxwebValidators.startsWith({value:'Senior',conditionalExpression:(x,y) => x.name == "Bharat" })(formGroup.controls.profession)).toBeNull()
        });


      it("Should error,  startsWith validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'name':['Bharat'],
            'profession':'Project Manager'
          });
          expect(RxwebValidators.startsWith({value:'Senior',conditionalExpression:(x,y) => x.name == "Bharat" })(formGroup.controls.profession)).toEqual({'startsWith':{ message: 'Input must starts with a pre defined value', refValues: [ 'Project Manager','Senior' ] } }); 
        });


      it("Should not error, startsWith validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'name':['Bharat'],
            'taskId':'#12856'
          });
          expect(RxwebValidators.startsWith({value:'#',conditionalExpression:'x => x.name =="Bharat"'})(formGroup.controls.taskId)).toBeNull()
        });

      it("Should not error, startsWith validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'name':['Bhuvan'],
            'taskId':24673
          });
          expect(RxwebValidators.startsWith({value:'#',conditionalExpression:'x => x.name =="Bharat"'})(formGroup.controls.taskId)).toBeNull()
        });


      it("Should error,  startsWith validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'name':['Bharat'],
            'taskId':16345
          });
          expect(RxwebValidators.startsWith({value:'#',conditionalExpression:'x => x.name =="Bharat"'})(formGroup.controls.taskId)).toEqual({'startsWith':{ message: 'Input must starts with a pre defined value', refValues: [ 16345,'#' ] } }); 
        });


      it("Should not error, startsWith validator Shows custom message",
        () => { 
          expect(RxwebValidators.startsWith({value:'R',message:'{{0}} does not starts with `R`'})(new FormControl('Reliance Industries'))).toBeNull(); 
        });


      it("Should error, startsWith validator Shows custom message",
        () => { 
          expect(RxwebValidators.startsWith({value:'R',message:'{{0}} does not starts with `R`'})(new FormControl('Microsoft Corporation'))).toEqual({'startsWith':{ message: 'Microsoft Corporation does not starts with `R`', refValues: [ 'Microsoft Corporation','R' ] } }); 
          });

        it("Should error, restrict startswith word",
            () => {
                expect(RxwebValidators.startsWith({ value: 'R', isRestrict: true, message: 'does not allow starts with `R`' })(new FormControl('R'))).toEqual({ 'startsWith': { message: 'does not allow starts with `R`', refValues: ['R', 'R'] } });
            });


        it("Should Pass, should not restrict other than 'R' Characters",
            () => {
                expect(RxwebValidators.startsWith({ value: 'R', isRestrict: true })(new FormControl('A'))).toBeNull();
            });




	//end
    });
  });

import {FormBuilder, FormControl} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '@rxweb/reactive-form-validators';



  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "endsWith": "Input must ends with a pre defined value",
        }
      });
    });

    describe('endsWithValidator', () => {

	      it("Should not error, endsWith validator If you want to apply conditional validation on 'Profession' or 'Task Id', then you need to add 'name' input as 'Bharat'",
        () => { 
          expect(RxwebValidators.endsWith({value:'t'})(new FormControl('Bharat'))).toBeNull(); 
        });


      it("Should error, endsWith validator If you want to apply conditional validation on 'Profession' or 'Task Id', then you need to add 'name' input as 'Bharat'",
        () => { 
          expect(RxwebValidators.endsWith({value:'t'})(new FormControl('Mahesh'))).toEqual({'endsWith':{ message: 'Input must ends with a pre defined value', refValues: [ 'Mahesh','t' ] } }); 
        });


      it("Should not error, endsWith validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'name':['Bharat'],
            'profession':'Senior Software Engineer'
          });
          expect(RxwebValidators.endsWith({value:'r',conditionalExpression:(x,y) => x.name == "Bharat" })(formGroup.controls.profession)).toBeNull()
        });

      it("Should not error, endsWith validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'name':['Bhuvan'],
            'profession':'Tech Lead'
          });
          expect(RxwebValidators.endsWith({value:'r',conditionalExpression:(x,y) => x.name == "Bharat" })(formGroup.controls.profession)).toBeNull()
        });


      it("Should error,  endsWith validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'name':['Bharat'],
            'profession':'Architect'
          });
          expect(RxwebValidators.endsWith({value:'r',conditionalExpression:(x,y) => x.name == "Bharat" })(formGroup.controls.profession)).toEqual({'endsWith':{ message: 'Input must ends with a pre defined value', refValues: [ 'Architect','r' ] } }); 
        });


      it("Should not error, endsWith validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'name':['Bharat'],
            'taskId':'#128561'
          });
          expect(RxwebValidators.endsWith({value:'1',conditionalExpression:'x => x.name =="Bharat"'})(formGroup.controls.taskId)).toBeNull()
        });

      it("Should not error, endsWith validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'name':['Bhuvan'],
            'taskId':'#24673'
          });
          expect(RxwebValidators.endsWith({value:'1',conditionalExpression:'x => x.name =="Bharat"'})(formGroup.controls.taskId)).toBeNull()
        });


      it("Should error,  endsWith validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'name':['Bharat'],
            'taskId':'#16345'
          });
          expect(RxwebValidators.endsWith({value:'1',conditionalExpression:'x => x.name =="Bharat"'})(formGroup.controls.taskId)).toEqual({'endsWith':{ message: 'Input must ends with a pre defined value', refValues: [ '#16345','1' ] } }); 
        });


      it("Should not error, endsWith validator Shows custom message",
        () => { 
          expect(RxwebValidators.endsWith({value:'b',message:'{{0}} does not ends with `b`'})(new FormControl('Oral b'))).toBeNull(); 
        });


      it("Should error, endsWith validator Shows custom message",
        () => { 
          expect(RxwebValidators.endsWith({value:'b',message:'{{0}} does not ends with `b`'})(new FormControl('Microsoft Corporation'))).toEqual({'endsWith':{ message: 'Microsoft Corporation does not ends with `b`', refValues: [ 'Microsoft Corporation','b' ] } }); 
        });




	//end
    });
  });

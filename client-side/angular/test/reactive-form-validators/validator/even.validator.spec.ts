import {FormBuilder, FormControl} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '@rxweb/reactive-form-validators';



  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "even": "Enter a valid even number.",
        }
      });
    });

    describe('evenValidator', () => {

	      it("Should not error, even validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'type':['Even'],
            'number':14
          });
          expect(RxwebValidators.even({conditionalExpression:(x,y) => x.type == "Even" })(formGroup.controls.number)).toBeNull()
        });

      it("Should not error, even validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'type':['Odd'],
            'number':15
          });
          expect(RxwebValidators.even({conditionalExpression:(x,y) => x.type == "Even" })(formGroup.controls.number)).toBeNull()
        });


      it("Should error,  even validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'type':['Even'],
            'number':15
          });
          expect(RxwebValidators.even({conditionalExpression:(x,y) => x.type == "Even" })(formGroup.controls.number)).toEqual({'even':{ message: 'Enter a valid even number.', refValues: [ 15 ] } }); 
        });


      it("Should not error, even validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'type':['Even'],
            'evenNumber':20
          });
          expect(RxwebValidators.even({conditionalExpression:'x => x.type == "Even"'})(formGroup.controls.evenNumber)).toBeNull()
        });

      it("Should not error, even validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'type':['Odd'],
            'evenNumber':19
          });
          expect(RxwebValidators.even({conditionalExpression:'x => x.type == "Even"'})(formGroup.controls.evenNumber)).toBeNull()
        });


      it("Should error,  even validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'type':['Even'],
            'evenNumber':21
          });
          expect(RxwebValidators.even({conditionalExpression:'x => x.type == "Even"'})(formGroup.controls.evenNumber)).toEqual({'even':{ message: 'Enter a valid even number.', refValues: [ 21 ] } }); 
        });



      it("Should error, even validator Shows custom message.",
        () => { 
          expect(RxwebValidators.even({message:'{{0}} is not an even number'})(new FormControl(21))).toEqual({'even':{ message: '21 is not an even number', refValues: [ 21 ] } }); 
        });




	//end
    });
  });

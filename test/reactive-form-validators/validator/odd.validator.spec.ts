import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';



(function() {
  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "odd": "Enter a valid odd number.",
        }
      });
    });

    describe('oddValidator', () => {

	      it("Should not error, odd validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'type':['Odd'],
            'number':27
          });
          expect(RxwebValidators.odd({conditionalExpression:(x,y) => x.type == "Odd" })(formGroup.controls.number)).toBeNull()
        });

      it("Should not error, odd validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'type':['Even'],
            'number':26
          });
          expect(RxwebValidators.odd({conditionalExpression:(x,y) => x.type == "Odd" })(formGroup.controls.number)).toBeNull()
        });


      it("Should error,  odd validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'type':['Odd'],
            'number':26
          });
          expect(RxwebValidators.odd({conditionalExpression:(x,y) => x.type == "Odd" })(formGroup.controls.number)).toEqual({'odd':{ message: 'Enter a valid odd number.', refValues: [ 26 ] } }); 
        });


      it("Should not error, odd validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'type':['Odd'],
            'oddNumber':27
          });
          expect(RxwebValidators.odd({conditionalExpression:'x => x.type == "Odd"'})(formGroup.controls.oddNumber)).toBeNull()
        });

      it("Should not error, odd validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'type':['Even'],
            'oddNumber':26
          });
          expect(RxwebValidators.odd({conditionalExpression:'x => x.type == "Odd"'})(formGroup.controls.oddNumber)).toBeNull()
        });


      it("Should error,  odd validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'type':['Odd'],
            'oddNumber':26
          });
          expect(RxwebValidators.odd({conditionalExpression:'x => x.type == "Odd"'})(formGroup.controls.oddNumber)).toEqual({'odd':{ message: 'Enter a valid odd number.', refValues: [ 26 ] } }); 
        });



      it("Should error, odd validator Shows custom message.",
        () => { 
          expect(RxwebValidators.odd({message:'{{0}} is not an odd number'})(new FormControl(26))).toEqual({'odd':{ message: '26 is not an odd number', refValues: [ 26 ] } }); 
        });




	//end
    });
  });
})();

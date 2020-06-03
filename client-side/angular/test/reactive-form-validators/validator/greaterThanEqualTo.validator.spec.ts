import {FormBuilder} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '@rxweb/reactive-form-validators';



  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "greaterThanEqualTo": "value should be greater than equal to field",
        }
      });
    });

    describe('greaterThanEqualToValidator', () => {

	      it("Should not error, greaterThanEqualTo validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'admissionAge':[18],
            'voterAge':19
          });
          expect(RxwebValidators.greaterThanEqualTo({fieldName:'admissionAge',conditionalExpression:(x,y) => x.admissionAge >= 18 })(formGroup.controls.voterAge)).toBeNull()
        });

      it("Should not error, greaterThanEqualTo validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'admissionAge':[12],
            'voterAge':2
          });
          expect(RxwebValidators.greaterThanEqualTo({fieldName:'admissionAge',conditionalExpression:(x,y) => x.admissionAge >= 18 })(formGroup.controls.voterAge)).toBeNull()
        });


      it("Should error,  greaterThanEqualTo validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'admissionAge':[18],
            'voterAge':2
          });
          expect(RxwebValidators.greaterThanEqualTo({fieldName:'admissionAge',conditionalExpression:(x,y) => x.admissionAge >= 18 })(formGroup.controls.voterAge)).toEqual({'greaterThanEqualTo':{ message: 'value should be greater than equal to field', refValues: [ 2,18 ] } }); 
        });


      it("Should not error, greaterThanEqualTo validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'admissionAge':[18],
            'memberAge':19
          });
          expect(RxwebValidators.greaterThanEqualTo({fieldName:'admissionAge',conditionalExpression:'x => x.admissionAge >= 18 '})(formGroup.controls.memberAge)).toBeNull()
        });

      it("Should not error, greaterThanEqualTo validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'admissionAge':[12],
            'memberAge':2
          });
          expect(RxwebValidators.greaterThanEqualTo({fieldName:'admissionAge',conditionalExpression:'x => x.admissionAge >= 18 '})(formGroup.controls.memberAge)).toBeNull()
        });


      it("Should error,  greaterThanEqualTo validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'admissionAge':[18],
            'memberAge':2
          });
          expect(RxwebValidators.greaterThanEqualTo({fieldName:'admissionAge',conditionalExpression:'x => x.admissionAge >= 18 '})(formGroup.controls.memberAge)).toEqual({'greaterThanEqualTo':{ message: 'value should be greater than equal to field', refValues: [ 2,18 ] } }); 
        });



      it("Should error,  greaterThanEqualTo validator Shows custom message",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'admissionAge':[12],
            'otherAge':1
          });
          expect(RxwebValidators.greaterThanEqualTo({fieldName:'admissionAge',message:'Please enter number greater than or equal to 1.'})(formGroup.controls.otherAge)).toEqual({'greaterThanEqualTo':{ message: 'Please enter number greater than or equal to 1.', refValues: [ 1,12 ] } }); 
        });




	//end
    });
  });

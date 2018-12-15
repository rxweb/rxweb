import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';



(function() {
  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "mac": "Enter valid MAC address.",
        }
      });
    });

    describe('macValidator', () => {

	      it("Should not error, mac validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'device':['Laptop'],
            'macAddress':'00:00:00:a1:2b:cc'
          });
          expect(RxwebValidators.mac({conditionalExpression:(x,y) => x.device == "Laptop" })(formGroup.controls.macAddress)).toBeNull()
        });

      it("Should not error, mac validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'device':['Smart Phone'],
            'macAddress':'00:00:00'
          });
          expect(RxwebValidators.mac({conditionalExpression:(x,y) => x.device == "Laptop" })(formGroup.controls.macAddress)).toBeNull()
        });


      it("Should error,  mac validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'device':['Laptop'],
            'macAddress':'New Delhi'
          });
          expect(RxwebValidators.mac({conditionalExpression:(x,y) => x.device == "Laptop" })(formGroup.controls.macAddress)).toEqual({'mac':{ message: 'Enter valid MAC address.', refValues: [ 'New Delhi' ] } }); 
        });


      it("Should not error, mac validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'device':['Laptop'],
            'localMacAddress':'00:1C:B3:a1:2b:cc'
          });
          expect(RxwebValidators.mac({conditionalExpression:'x => x.device =="Laptop"'})(formGroup.controls.localMacAddress)).toBeNull()
        });

      it("Should not error, mac validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'device':['Smart Phone'],
            'localMacAddress':'00:00:00'
          });
          expect(RxwebValidators.mac({conditionalExpression:'x => x.device =="Laptop"'})(formGroup.controls.localMacAddress)).toBeNull()
        });


      it("Should error,  mac validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'device':['Laptop'],
            'localMacAddress':'New Delhi'
          });
          expect(RxwebValidators.mac({conditionalExpression:'x => x.device =="Laptop"'})(formGroup.controls.localMacAddress)).toEqual({'mac':{ message: 'Enter valid MAC address.', refValues: [ 'New Delhi' ] } }); 
        });



      it("Should error, mac validator Shows custom message.",
        () => { 
          expect(RxwebValidators.mac({message:'{{0}} is not a MAC address'})(new FormControl('00:A0:C9'))).toEqual({'mac':{ message: '00:A0:C9 is not a MAC address', refValues: [ '00:A0:C9' ] } }); 
        });




	//end
    });
  });
})();

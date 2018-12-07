import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "mac": "Enter valid MAC address.",
        }
      });
    });

    describe('mac', () => {
      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.mac()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.mac()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.mac()(new FormControl(undefined))).toBeNull(); 
        });

      it('should not give error on control which contains value which is proper mac.',
        () => { 
          expect(RxwebValidators.mac()(new FormControl('E8:FC:AF:B9:BE:A2'))).toBeNull(); 
        });

      it('should give error on control which contains value which is not proper mac.',
        () => { 
          expect(RxwebValidators.mac()(new FormControl('E8:FC:AF'))).toEqual({'mac':{ message: 'Enter valid MAC address.', refValues: [ 'E8:FC:AF' ] } }); 
        });


	      it('should not give error if the device value is Laptop in macAddress FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'device':['Laptop'],
            'macAddress':['E8:FC:AF:B9:BE:A2'],
          });
          expect(RxwebValidators.mac({conditionalExpression:(x,y) => x.device == "Laptop" })(formGroup.controls.macAddress)).toBeNull();

        });

	      it('should not give error if the device value is Laptop in localMacAddress FormControl with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'device':['Laptop'],
            'localMacAddress':['F8:FC:AF:B9:BE:A2'],
          });
          expect(RxwebValidators.mac({conditionalExpression:'x => x.device =="Laptop"'})(formGroup.controls.localMacAddress)).toBeNull();

        });

	      it('should not give error if the device value is Pc and value in macAddress FormControl is not valid mac with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'device':['Pc'],
            'macAddress':['F8:FC:'],
          });
          expect(RxwebValidators.mac({conditionalExpression:(x,y) => x.device == "Laptop" })(formGroup.controls.macAddress)).toBeNull();

        });

	      it('should not give error if the device value is Pc and value in localMacAddress FormControl  is not valid mac with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'device':['Pc'],
            'localMacAddress':['B9:BE:A2'],
          });
          expect(RxwebValidators.mac({conditionalExpression:'x => x.device =="Laptop"'})(formGroup.controls.localMacAddress)).toBeNull();

        });


	      it('should give error if the device value is Laptop and value in macAddress FormControl is not valid mac with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'device':['Laptop'],
            'macAddress':['B9:BE:A2'],
          });
          expect(RxwebValidators.mac({conditionalExpression:(x,y) => x.device == "Laptop" })(formGroup.controls.macAddress)).toEqual({'mac':{ message: 'Enter valid MAC address.', refValues: [ 'B9:BE:A2' ] } });

        });

	      it('should give error if the device value is Laptop and value in localMacAddress FormControl is not valid mac with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'device':['Laptop'],
            'localMacAddress':['F8:FC:'],
          });
          expect(RxwebValidators.mac({conditionalExpression:'x => x.device =="Laptop"'})(formGroup.controls.localMacAddress)).toEqual({'mac':{ message: 'Enter valid MAC address.', refValues: [ 'F8:FC:' ] } });

        });




	      it('should give error if the control conatins value which is not valid amc.',
        () => {
          expect(RxwebValidators.mac({message:'{{0}} is not a MAC address'})(new FormControl('F8:FC:'))).toEqual({'mac':{ message: 'F8:FC: is not a MAC address', refValues: [ 'F8:FC:' ] } });

        });



//end
    });
  });
})();

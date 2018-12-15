
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { ReactiveFormConfig,RxFormBuilder } from '../../../packages/reactive-form-validators';


import {  mac,prop, } from    '../../../packages/reactive-form-validators';  

export class MacAddressInfo {

	@prop()
	device: string;

	//If you want to apply conditional expression of type 'function'
	@mac({conditionalExpression:(x,y) => x.device == "Laptop"  }) 
	macAddress: string;

	//If you want to apply conditional expression of type 'string'
	@mac({conditionalExpression:'x => x.device =="Laptop"' }) 
	localMacAddress: string;

	@mac({message:'{{0}} is not a MAC address' }) 
	systemMacAddress: string;

}




(function() {
  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "mac": "Enter valid MAC address.",
        }
      });
    });

    describe('macDecorator', () => {

	
    it("Should not error, mac decorator  Conditional Expression with type 'function'",
        () => {
		let macAddressInfo = new MacAddressInfo();
		macAddressInfo.device = 'Laptop';
        let formGroup = formBuilder.formGroup(macAddressInfo);
        formGroup.controls.macAddress.setValue('00:00:00:a1:2b:cc');
        expect(formGroup.controls.macAddress.errors).toBeNull();
     });

    it('macAddress value should be "00:00:00:a1:2b:cc".',
        () => {
        let macAddressInfo = new MacAddressInfo();
        macAddressInfo.macAddress = '00:00:00:a1:2b:cc';
        let formGroup = formBuilder.formGroup(macAddressInfo);
        expect(formGroup.controls.macAddress.value).toEqual('00:00:00:a1:2b:cc');
     });
    it("Should not error, mac decorator  Conditional Expression with type 'function'",
        () => {
		let macAddressInfo = new MacAddressInfo();
		macAddressInfo.device = 'Smart Phone';
        let formGroup = formBuilder.formGroup(macAddressInfo);
        formGroup.controls.macAddress.setValue('00:00:00');
        expect(formGroup.controls.macAddress.errors).toBeNull();
     });



    it("Should error, mac decorator Conditional Expression with type 'function'",
        () => {
		let macAddressInfo = new MacAddressInfo();
		macAddressInfo.device = 'Laptop';
        let formGroup = formBuilder.formGroup(macAddressInfo);
        formGroup.controls.macAddress.setValue('New Delhi');
        expect(formGroup.controls.macAddress.errors).toEqual({'mac':{ message: 'Enter valid MAC address.', refValues: [ 'New Delhi' ] } });
     });


    it("Should not error, mac decorator  Conditional Expression with type 'string'",
        () => {
		let macAddressInfo = new MacAddressInfo();
		macAddressInfo.device = 'Laptop';
        let formGroup = formBuilder.formGroup(macAddressInfo);
        formGroup.controls.localMacAddress.setValue('00:1C:B3:a1:2b:cc');
        expect(formGroup.controls.localMacAddress.errors).toBeNull();
     });

    it('localMacAddress value should be "00:1C:B3:a1:2b:cc".',
        () => {
        let macAddressInfo = new MacAddressInfo();
        macAddressInfo.localMacAddress = '00:1C:B3:a1:2b:cc';
        let formGroup = formBuilder.formGroup(macAddressInfo);
        expect(formGroup.controls.localMacAddress.value).toEqual('00:1C:B3:a1:2b:cc');
     });
    it("Should not error, mac decorator  Conditional Expression with type 'string'",
        () => {
		let macAddressInfo = new MacAddressInfo();
		macAddressInfo.device = 'Smart Phone';
        let formGroup = formBuilder.formGroup(macAddressInfo);
        formGroup.controls.localMacAddress.setValue('00:00:00');
        expect(formGroup.controls.localMacAddress.errors).toBeNull();
     });



    it("Should error, mac decorator Conditional Expression with type 'string'",
        () => {
		let macAddressInfo = new MacAddressInfo();
		macAddressInfo.device = 'Laptop';
        let formGroup = formBuilder.formGroup(macAddressInfo);
        formGroup.controls.localMacAddress.setValue('New Delhi');
        expect(formGroup.controls.localMacAddress.errors).toEqual({'mac':{ message: 'Enter valid MAC address.', refValues: [ 'New Delhi' ] } });
     });



	 it("Should error, mac decorator Shows custom message.",
        () => {
		let macAddressInfo = new MacAddressInfo();
        let formGroup = formBuilder.formGroup(macAddressInfo);
		formGroup.controls.systemMacAddress.setValue('00:A0:C9');
        expect(formGroup.controls.systemMacAddress.errors).toEqual({'mac':{ message: '00:A0:C9 is not a MAC address', refValues: [ '00:A0:C9' ] } });
     });



	//end
    });
  });
})();

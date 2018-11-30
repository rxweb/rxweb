import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig,RxFormBuilder,alpha } from '../../../packages/reactive-form-validators';


export class AddressInfo {

	@alpha() 
	countryName: string;

	
	@alpha({conditionalExpression:(x,y) => x.countryName == "India" }) 
	countryCode: string;

	
	@alpha({conditionalExpression:'x => x.countryName =="India"' }) 
	cityName: string;

	@alpha({allowWhiteSpace:true }) 
	stateName: string;

  @alpha({allowWhiteSpace:false }) 
  zipCode:string;

	@alpha({message:'You can enter only alphabets.' }) 
	stateCode: string;

}


(function() {
  describe('validation-decorators', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
            "validationMessage": {
                "alpha": "only accepts alphabets.",
            }
        });
   });

    describe('@alpha()', () => {
     it('should not error in countryName property with null value.',
         () => {
        let formGroup = formBuilder.formGroup(AddressInfo);
        expect(formGroup.controls.countryName.errors).toBeNull();
     });

      it('should not error in countryName property with empty string value.',
         () => {
        let addressInfo = new AddressInfo();
        addressInfo.countryName = '';
        let formGroup = formBuilder.formGroup(addressInfo);
        expect(formGroup.controls.countryName.errors).toBeNull();
     });

    it('should not error in countryName property with undefined value.',
         () => {
        let addressInfo = new AddressInfo();
        addressInfo.countryName = undefined;
        let formGroup = formBuilder.formGroup(addressInfo);
        expect(formGroup.controls.countryName.errors).toBeNull();
     });

    it('should not error in countryName property with undefined value.',
        () => {
        let addressInfo = new AddressInfo();
        addressInfo.countryName = undefined;
        let formGroup = formBuilder.formGroup(addressInfo);
        expect(formGroup.controls.countryName.errors).toBeNull();
     });

    it('should not error in countryName property with alphabets values.',
        () => {
        let addressInfo = new AddressInfo();
        addressInfo.countryName = "India";
        let formGroup = formBuilder.formGroup(addressInfo);
        expect(formGroup.controls.countryName.errors).toBeNull();
     });

    it('countryName value should be "India".',
        () => {
        let addressInfo = new AddressInfo();
        addressInfo.countryName = "India";
        let formGroup = formBuilder.formGroup(addressInfo);
        expect(formGroup.controls.countryName.value).toEqual("India");
     });

    it('should not allow value in countryName property other than alpha.',
        () => {
        let addressInfo = new AddressInfo();
        addressInfo.countryName = "India@";
        let formGroup = formBuilder.formGroup(addressInfo);
        expect(formGroup.controls.countryName.errors).toEqual({'alpha':{ message: 'only accepts alphabets.', refValues: [ 'India@' ] } });
     });

    it('should allow white space in cityName property.',
        () => {
        let addressInfo = new AddressInfo();
        addressInfo.stateName = "Tamil Nadu";
        let formGroup = formBuilder.formGroup(addressInfo);
        expect(formGroup.controls.stateName.errors).toBeNull();
     });

    it('should not allow white space in countryName property.',
        () => {
        let addressInfo = new AddressInfo();
        addressInfo.countryName = "New Delhi";
        let formGroup = formBuilder.formGroup(addressInfo);
        expect(formGroup.controls.countryName.errors).toEqual({'alpha':{ message: 'only accepts alphabets.', refValues: [ 'New Delhi' ] } });
     });

    it('should not allow white space in zipcode property.',
        () => {
        let addressInfo = new AddressInfo();
        addressInfo.zipCode = "123 123";
        let formGroup = formBuilder.formGroup(addressInfo);
        expect(formGroup.controls.zipCode.errors).toEqual({'alpha':{ message: 'only accepts alphabets.', refValues: [ '123 123' ] } });
     });

    it('should allow other than alpha in countryCode value.',
        () => {
        let addressInfo = new AddressInfo();
        let formGroup = formBuilder.formGroup(addressInfo);
        formGroup.controls.countryCode.setValue("#123")
        expect(formGroup.controls.countryCode.errors).toBeNull();
     });

     it('should not allow other than alpha in countryCode value when countryName value is "India".',
        () => {
        let addressInfo = new AddressInfo();
        addressInfo.countryName = "India";
        let formGroup = formBuilder.formGroup(addressInfo);
        formGroup.controls.countryCode.setValue("#123");
        expect(formGroup.controls.countryCode.errors).toEqual({'alpha':{ message: 'only accepts alphabets.', refValues: [ '#123' ] } });
     });

    it('should not allow other than alpha in cityName value when countryName value is "India".',
        () => {
        let addressInfo = new AddressInfo();
        addressInfo.countryName = "India";
        let formGroup = formBuilder.formGroup(addressInfo);
        formGroup.controls.cityName.setValue("#Ahmedabad");
        expect(formGroup.controls.cityName.errors).toEqual({'alpha':{ message: 'only accepts alphabets.', refValues: [ '#Ahmedabad' ] } });
     });

    it('should allow other than alpha in cityName value.',
        () => {
        let addressInfo = new AddressInfo();
        let formGroup = formBuilder.formGroup(addressInfo);
        formGroup.controls.cityName.setValue("#Ahmedabad");
        expect(formGroup.controls.cityName.errors).toBeNull();
     });

    it('should show custom message which is defined in alpha decorator.',
        () => {
        let addressInfo = new AddressInfo();
        addressInfo.stateCode = "#MEL";
        let formGroup = formBuilder.formGroup(addressInfo);
        expect(formGroup.controls.stateCode.errors).toEqual({'alpha':{ message: 'You can enter only alphabets.', refValues: [ '#MEL' ] } });
     });

    it('addressInfoFormGroup controls count should be 6.',
        () => {
        let addressInfo = new AddressInfo();
        addressInfo.stateCode = "#MEL";
        let formGroup = formBuilder.formGroup(addressInfo);
        expect(Object.keys(formGroup.value).length).toEqual(6);
     });

    });
  });
})();


import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { ReactiveFormConfig,RxFormBuilder } from '../../../packages/reactive-form-validators';


import {  upperCase, } from    '../../../packages/reactive-form-validators';  

export class Location {

	@upperCase() 
	countryName: string;

	//If you want to apply conditional expression of type 'function'
	@upperCase({conditionalExpression:(x,y) => x.countryName == "INDIA"  }) 
	stateName: string;

	//If you want to apply conditional expression of type 'string'
	@upperCase({conditionalExpression:'x => x.countryName == "INDIA"' }) 
	cityName: string;

	//Shows custom message
	@upperCase({message:'You can enter only upperCase letters.' }) 
	colonyName: string;

}




(function() {
  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "upperCase": "Only upper case are allowed.",
        }
      });
    });

    describe('upperCaseDecorator', () => {

	
	  it('should not error in countryName property with null value.',
        () => {
        let formGroup = formBuilder.formGroup(Location);
        expect(formGroup.controls.countryName.errors).toBeNull();
     });

	 it('should not error in countryName property with undefined value.',
        () => {
		let location = new Location();
        location.countryName = undefined;
        let formGroup = formBuilder.formGroup(location);
        expect(formGroup.controls.countryName.errors).toBeNull();
     });

	 it("Should not error, upperCase decorator  Enter the 'INDIA' in 'Country Name' or 'City Name' text box to see the validation in 'State Name' text box.",
        () => {
		let location = new Location();
        location.countryName = undefined;
        let formGroup = formBuilder.formGroup(location);
        expect(formGroup.controls.countryName.errors).toBeNull();
     });

    it('countryName value should be "INDIA".',
        () => {
        let location = new Location();
        location.countryName = 'INDIA';
        let formGroup = formBuilder.formGroup(location);
        expect(formGroup.controls.countryName.value).toEqual('INDIA');
     });

	 it("Should error, upperCase decorator Enter the 'INDIA' in 'Country Name' or 'City Name' text box to see the validation in 'State Name' text box.",
        () => {
		let location = new Location();
        let formGroup = formBuilder.formGroup(location);
		formGroup.controls.countryName.setValue('India');
        expect(formGroup.controls.countryName.errors).toEqual({'upperCase':{ message: 'Only upper case are allowed.', refValues: [ 'India' ] } });
     });


    it("Should not error, upperCase decorator  Conditional Expression with type 'function'",
        () => {
		let location = new Location();
		location.countryName = 'INDIA';
        let formGroup = formBuilder.formGroup(location);
        formGroup.controls.stateName.setValue('MAHARASHTRA');
        expect(formGroup.controls.stateName.errors).toBeNull();
     });

    it('stateName value should be "MAHARASHTRA".',
        () => {
        let location = new Location();
        location.stateName = 'MAHARASHTRA';
        let formGroup = formBuilder.formGroup(location);
        expect(formGroup.controls.stateName.value).toEqual('MAHARASHTRA');
     });
    it("Should not error, upperCase decorator  Conditional Expression with type 'function'",
        () => {
		let location = new Location();
		location.countryName = 'AUSTRALIA';
        let formGroup = formBuilder.formGroup(location);
        formGroup.controls.stateName.setValue('Queensland');
        expect(formGroup.controls.stateName.errors).toBeNull();
     });



    it("Should error, upperCase decorator Conditional Expression with type 'function'",
        () => {
		let location = new Location();
		location.countryName = 'INDIA';
        let formGroup = formBuilder.formGroup(location);
        formGroup.controls.stateName.setValue('Gujarat');
        expect(formGroup.controls.stateName.errors).toEqual({'upperCase':{ message: 'Only upper case are allowed.', refValues: [ 'Gujarat' ] } });
     });


    it("Should not error, upperCase decorator  Conditional Expression with type 'string'",
        () => {
		let location = new Location();
		location.countryName = 'INDIA';
        let formGroup = formBuilder.formGroup(location);
        formGroup.controls.cityName.setValue('MUMBAI');
        expect(formGroup.controls.cityName.errors).toBeNull();
     });

    it('cityName value should be "MUMBAI".',
        () => {
        let location = new Location();
        location.cityName = 'MUMBAI';
        let formGroup = formBuilder.formGroup(location);
        expect(formGroup.controls.cityName.value).toEqual('MUMBAI');
     });
    it("Should not error, upperCase decorator  Conditional Expression with type 'string'",
        () => {
		let location = new Location();
		location.countryName = 'AUSTRALIA';
        let formGroup = formBuilder.formGroup(location);
        formGroup.controls.cityName.setValue('Logan City');
        expect(formGroup.controls.cityName.errors).toBeNull();
     });



    it("Should error, upperCase decorator Conditional Expression with type 'string'",
        () => {
		let location = new Location();
		location.countryName = 'INDIA';
        let formGroup = formBuilder.formGroup(location);
        formGroup.controls.cityName.setValue('Surat');
        expect(formGroup.controls.cityName.errors).toEqual({'upperCase':{ message: 'Only upper case are allowed.', refValues: [ 'Surat' ] } });
     });



	 it("Should error, upperCase decorator ",
        () => {
		let location = new Location();
        let formGroup = formBuilder.formGroup(location);
		formGroup.controls.colonyName.setValue('Bandra');
        expect(formGroup.controls.colonyName.errors).toEqual({'upperCase':{ message: 'You can enter only upperCase letters.', refValues: [ 'Bandra' ] } });
     });



	//end
    });
  });
})();

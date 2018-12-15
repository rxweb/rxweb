
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { ReactiveFormConfig,RxFormBuilder } from '../../../packages/reactive-form-validators';


import {  longitude,prop, } from    '../../../packages/reactive-form-validators';  

export class Country {

	@prop()
	continent: string;

	//If you want to apply conditional expression of type 'function'
	@longitude({conditionalExpression:(x,y) => x.continent == "Asia"  }) 
	secondCountryLongitude: string;

	//If you want to apply conditional expression of type 'string'
	@longitude({conditionalExpression:'x => x.continent =="Asia"' }) 
	thirdCountryLongitude: string;

	@longitude({message:'{{0}} is not a longitude' }) 
	firstCountryLongitude: string;

}




(function() {
  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "longitude": "Please enter a valid longitude",
        }
      });
    });

    describe('longitudeDecorator', () => {

	
    it("Should not error, longitude decorator  Conditional Expression with type 'function'",
        () => {
		let country = new Country();
		country.continent = 'Asia';
        let formGroup = formBuilder.formGroup(country);
        formGroup.controls.secondCountryLongitude.setValue('20.5937');
        expect(formGroup.controls.secondCountryLongitude.errors).toBeNull();
     });

    it('secondCountryLongitude value should be "20.5937".',
        () => {
        let country = new Country();
        country.secondCountryLongitude = '20.5937';
        let formGroup = formBuilder.formGroup(country);
        expect(formGroup.controls.secondCountryLongitude.value).toEqual('20.5937');
     });
    it("Should not error, longitude decorator  Conditional Expression with type 'function'",
        () => {
		let country = new Country();
		country.continent = 'Africa';
        let formGroup = formBuilder.formGroup(country);
        formGroup.controls.secondCountryLongitude.setValue(222);
        expect(formGroup.controls.secondCountryLongitude.errors).toBeNull();
     });



    it("Should error, longitude decorator Conditional Expression with type 'function'",
        () => {
		let country = new Country();
		country.continent = 'Asia';
        let formGroup = formBuilder.formGroup(country);
        formGroup.controls.secondCountryLongitude.setValue(220);
        expect(formGroup.controls.secondCountryLongitude.errors).toEqual({'longitude':{ message: 'Please enter a valid longitude', refValues: [ 220 ] } });
     });


    it("Should not error, longitude decorator  Conditional Expression with type 'string'",
        () => {
		let country = new Country();
		country.continent = 'Asia';
        let formGroup = formBuilder.formGroup(country);
        formGroup.controls.thirdCountryLongitude.setValue('78.9629');
        expect(formGroup.controls.thirdCountryLongitude.errors).toBeNull();
     });

    it('thirdCountryLongitude value should be "78.9629".',
        () => {
        let country = new Country();
        country.thirdCountryLongitude = '78.9629';
        let formGroup = formBuilder.formGroup(country);
        expect(formGroup.controls.thirdCountryLongitude.value).toEqual('78.9629');
     });
    it("Should not error, longitude decorator  Conditional Expression with type 'string'",
        () => {
		let country = new Country();
		country.continent = 'Africa';
        let formGroup = formBuilder.formGroup(country);
        formGroup.controls.thirdCountryLongitude.setValue(222);
        expect(formGroup.controls.thirdCountryLongitude.errors).toBeNull();
     });



    it("Should error, longitude decorator Conditional Expression with type 'string'",
        () => {
		let country = new Country();
		country.continent = 'Asia';
        let formGroup = formBuilder.formGroup(country);
        formGroup.controls.thirdCountryLongitude.setValue(220);
        expect(formGroup.controls.thirdCountryLongitude.errors).toEqual({'longitude':{ message: 'Please enter a valid longitude', refValues: [ 220 ] } });
     });



	 it("Should error, longitude decorator Shows custom message.",
        () => {
		let country = new Country();
        let formGroup = formBuilder.formGroup(country);
		formGroup.controls.firstCountryLongitude.setValue(230);
        expect(formGroup.controls.firstCountryLongitude.errors).toEqual({'longitude':{ message: '230 is not a longitude', refValues: [ 230 ] } });
     });



	//end
    });
  });
})();


import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { ReactiveFormConfig,RxFormBuilder } from '../../../packages/reactive-form-validators';


import {  latitude,prop, } from    '../../../packages/reactive-form-validators';  

export class Country {

	@prop()
	continent: string;

	//If you want to apply conditional expression of type 'function'
	@latitude({conditionalExpression:(x,y) => x.continent == "Asia"  }) 
	secondCountryLatitude: string;

	//If you want to apply conditional expression of type 'string'
	@latitude({conditionalExpression:'x => x.continent =="Asia"' }) 
	thirdCountryLatitude: string;

	@latitude({message:'{{0}} is not a latitude' }) 
	firstCountryLatitude: string;

}




(function() {
  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "latitude": "Please enter a valid latitude",
        }
      });
    });

    describe('latitudeDecorator', () => {

	
    it("Should not error, latitude decorator  Conditional Expression with type 'function'",
        () => {
		let country = new Country();
		country.continent = 'Asia';
        let formGroup = formBuilder.formGroup(country);
        formGroup.controls.secondCountryLatitude.setValue('20.5937');
        expect(formGroup.controls.secondCountryLatitude.errors).toBeNull();
     });

    it('secondCountryLatitude value should be "20.5937".',
        () => {
        let country = new Country();
        country.secondCountryLatitude = '20.5937';
        let formGroup = formBuilder.formGroup(country);
        expect(formGroup.controls.secondCountryLatitude.value).toEqual('20.5937');
     });
    it("Should not error, latitude decorator  Conditional Expression with type 'function'",
        () => {
		let country = new Country();
		country.continent = 'Africa';
        let formGroup = formBuilder.formGroup(country);
        formGroup.controls.secondCountryLatitude.setValue(222);
        expect(formGroup.controls.secondCountryLatitude.errors).toBeNull();
     });



    it("Should error, latitude decorator Conditional Expression with type 'function'",
        () => {
		let country = new Country();
		country.continent = 'Asia';
        let formGroup = formBuilder.formGroup(country);
        formGroup.controls.secondCountryLatitude.setValue(220);
        expect(formGroup.controls.secondCountryLatitude.errors).toEqual({'latitude':{ message: 'Please enter a valid latitude', refValues: [ 220 ] } });
     });


    it("Should not error, latitude decorator  Conditional Expression with type 'string'",
        () => {
		let country = new Country();
		country.continent = 'Asia';
        let formGroup = formBuilder.formGroup(country);
        formGroup.controls.thirdCountryLatitude.setValue('78.9629');
        expect(formGroup.controls.thirdCountryLatitude.errors).toBeNull();
     });

    it('thirdCountryLatitude value should be "78.9629".',
        () => {
        let country = new Country();
        country.thirdCountryLatitude = '78.9629';
        let formGroup = formBuilder.formGroup(country);
        expect(formGroup.controls.thirdCountryLatitude.value).toEqual('78.9629');
     });
    it("Should not error, latitude decorator  Conditional Expression with type 'string'",
        () => {
		let country = new Country();
		country.continent = 'Africa';
        let formGroup = formBuilder.formGroup(country);
        formGroup.controls.thirdCountryLatitude.setValue(222);
        expect(formGroup.controls.thirdCountryLatitude.errors).toBeNull();
     });



    it("Should error, latitude decorator Conditional Expression with type 'string'",
        () => {
		let country = new Country();
		country.continent = 'Asia';
        let formGroup = formBuilder.formGroup(country);
        formGroup.controls.thirdCountryLatitude.setValue(220);
        expect(formGroup.controls.thirdCountryLatitude.errors).toEqual({'latitude':{ message: 'Please enter a valid latitude', refValues: [ 220 ] } });
     });



	 it("Should error, latitude decorator Shows custom message.",
        () => {
		let country = new Country();
        let formGroup = formBuilder.formGroup(country);
		formGroup.controls.firstCountryLatitude.setValue(230);
        expect(formGroup.controls.firstCountryLatitude.errors).toEqual({'latitude':{ message: '230 is not a latitude', refValues: [ 230 ] } });
     });



	//end
    });
  });
})();

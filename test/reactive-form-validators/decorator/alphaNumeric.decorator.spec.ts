import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { ReactiveFormConfig,RxFormBuilder } from '../../../packages/reactive-form-validators';


import {  alphaNumeric } from    '../../../packages/reactive-form-validators';  

export class Location {

	@alphaNumeric() 
	areaName: string;

	@alphaNumeric({allowWhiteSpace:true }) 
	flatAddress: string;

	//Shows custom message
	@alphaNumeric({message:'Please enter only alphanumerics, special characters are not allowed.' }) 
	postalAddress: string;

	//If you want to apply conditional expression of type 'function'
	@alphaNumeric({conditionalExpression:(x,y) => x.areaName == "Delhi"  }) 
	countryCode: string;

	//If you want to apply conditional expression of type 'string'
	@alphaNumeric({conditionalExpression:'x => x.areaName =="Delhi"' }) 
	cityCode: string;

}

(function() {
    describe('Decorator', () => {
      let formBuilder = new RxFormBuilder();
      beforeEach(() => {
        ReactiveFormConfig.set({
          "validationMessage": {
            "alphaNumeric": "Only alphanumerics are allowed.",
          }
        });
      });
      describe('alphaNumericDecorator', () => {

	
        it('should not error in areaName property with null value.',
          () => {
          let formGroup = formBuilder.formGroup(Location);
          expect(formGroup.controls.areaName.errors).toBeNull();
       });
  
       it('should not error in areaName property with null value.',
          () => {
          let location = new Location();
          location.areaName = undefined;
          let formGroup = formBuilder.formGroup(location);
          expect(formGroup.controls.areaName.errors).toBeNull();
       });
  
      it("Should not error, alphaNumeric decorator  If you want to apply conditional expression of type 'function'",
          () => {
          let location = new Location();
          location.areaName = 'Delhi';
          let formGroup = formBuilder.formGroup(location);
          formGroup.controls.countryCode.setValue('AU');
          expect(formGroup.controls.countryCode.errors).toBeNull();
       });
  
      it("Should not error, alphaNumeric decorator  If you want to apply conditional expression of type 'function'",
          () => {
          let location = new Location();
          location.areaName = 'Mumbai';
          let formGroup = formBuilder.formGroup(location);
          formGroup.controls.countryCode.setValue('@AU');
          expect(formGroup.controls.countryCode.errors).toBeNull();
       });

      it("Should error, alphaNumeric decorator  If you want to apply conditional expression of type 'function'",
          () => {
          let location = new Location();
          location.areaName = 'Delhi';
          let formGroup = formBuilder.formGroup(location);
          formGroup.controls.countryCode.setValue('@AU');
          expect(formGroup.controls.countryCode.errors).toEqual({'alphaNumeric':{ message: 'Only alphanumerics are allowed.', refValues: [ '@AU' ] } });
         });
       
  
  
      it("Should not error, alphaNumeric decorator  If you want to apply conditional expression of type 'string'",
          () => {
            let location = new Location();
            location.areaName = 'Delhi';
            let formGroup = formBuilder.formGroup(location);
            formGroup.controls.cityCode.setValue('DI');
           expect(formGroup.controls.cityCode.errors).toBeNull();
       });
  
      it("Should not error, alphaNumeric decorator  If you want to apply conditional expression of type 'string'",
          () => {
            let location = new Location();
            location.areaName = 'Mumbai';
            let formGroup = formBuilder.formGroup(location);
            formGroup.controls.cityCode.setValue('@DI');
            expect(formGroup.controls.cityCode.errors).toBeNull();
       });
      it("Should error, alphaNumeric decorator  If you want to apply conditional expression of type 'string'",
          () => {
            let location = new Location();
            location.areaName = 'Delhi';
            let formGroup = formBuilder.formGroup(location);
            formGroup.controls.cityCode.setValue('@DI');
           expect(formGroup.controls.cityCode.errors).toEqual({'alphaNumeric':{ message: 'Only alphanumerics are allowed.', refValues: [ '@DI' ] } });
       });
  
  
  
       it("Should error, alphaNumeric decorator Shows custom message",
          () => {
          let location = new Location();
          let formGroup = formBuilder.formGroup(location);
          formGroup.controls.postalAddress.setValue('16 Amphi-theatre');
          expect(formGroup.controls.postalAddress.errors).toEqual({'alphaNumeric':{ message: 'Please enter only alphanumerics, special characters are not allowed.', refValues: [ '16 Amphi-theatre' ] } });
       });
  
   
  
      //end
      });
    });
   })();
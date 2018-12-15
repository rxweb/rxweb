import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';



(function() {
  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "upperCase": "Only upper case are allowed.",
        }
      });
    });

    describe('upperCaseValidator', () => {

	      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.upperCase()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.upperCase()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.upperCase()(new FormControl(undefined))).toBeNull(); 
        });

      it("Should not error, upperCase validator Enter the 'INDIA' in 'Country Name' or 'City Name' text box to see the validation in 'State Name' text box.",
        () => { 
          expect(RxwebValidators.upperCase()(new FormControl('INDIA'))).toBeNull(); 
        });


      it("Should error, upperCase validator Enter the 'INDIA' in 'Country Name' or 'City Name' text box to see the validation in 'State Name' text box.",
        () => { 
          expect(RxwebValidators.upperCase()(new FormControl('India'))).toEqual({'upperCase':{ message: 'Only upper case are allowed.', refValues: [ 'India' ] } }); 
        });


      it("Should not error, upperCase validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'countryName':['INDIA'],
            'stateName':'MAHARASHTRA'
          });
          expect(RxwebValidators.upperCase({conditionalExpression:(x,y) => x.countryName == "INDIA" })(formGroup.controls.stateName)).toBeNull()
        });

      it("Should not error, upperCase validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'countryName':['AUSTRALIA'],
            'stateName':'Queensland'
          });
          expect(RxwebValidators.upperCase({conditionalExpression:(x,y) => x.countryName == "INDIA" })(formGroup.controls.stateName)).toBeNull()
        });


      it("Should error,  upperCase validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'countryName':['INDIA'],
            'stateName':'Gujarat'
          });
          expect(RxwebValidators.upperCase({conditionalExpression:(x,y) => x.countryName == "INDIA" })(formGroup.controls.stateName)).toEqual({'upperCase':{ message: 'Only upper case are allowed.', refValues: [ 'Gujarat' ] } }); 
        });


      it("Should not error, upperCase validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'countryName':['INDIA'],
            'cityName':'MUMBAI'
          });
          expect(RxwebValidators.upperCase({conditionalExpression:'x => x.countryName == "INDIA"'})(formGroup.controls.cityName)).toBeNull()
        });

      it("Should not error, upperCase validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'countryName':['AUSTRALIA'],
            'cityName':'Logan City'
          });
          expect(RxwebValidators.upperCase({conditionalExpression:'x => x.countryName == "INDIA"'})(formGroup.controls.cityName)).toBeNull()
        });


      it("Should error,  upperCase validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'countryName':['INDIA'],
            'cityName':'Surat'
          });
          expect(RxwebValidators.upperCase({conditionalExpression:'x => x.countryName == "INDIA"'})(formGroup.controls.cityName)).toEqual({'upperCase':{ message: 'Only upper case are allowed.', refValues: [ 'Surat' ] } }); 
        });



      it("Should error, upperCase validator ",
        () => { 
          expect(RxwebValidators.upperCase({message:'You can enter only upperCase letters.'})(new FormControl('Bandra'))).toEqual({'upperCase':{ message: 'You can enter only upperCase letters.', refValues: [ 'Bandra' ] } }); 
        });




	//end
    });
  });
})();

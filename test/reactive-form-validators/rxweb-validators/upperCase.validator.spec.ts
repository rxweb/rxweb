import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "upperCase": "Only upper case are allowed.",
        }
      });
    });

    describe('upperCase', () => {
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

      it('Should not give error in any upper case value',
        () => { 
          expect(RxwebValidators.upperCase()(new FormControl('INDIA'))).toBeNull(); 
        });

      it('Should give error in any non upper case value',
        () => { 
          expect(RxwebValidators.upperCase()(new FormControl('India'))).toEqual({'upperCase':{ message: 'Only upper case are allowed.', refValues: [ 'India' ] } }); 
        });


	      it('should not give error if the countryName value is INDIA and upper case value in stateName FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'countryName':['INDIA'],
            'stateName':['GUJARAT'],
          });
          expect(RxwebValidators.upperCase({conditionalExpression:(x,y) => x.countryName == "INDIA" })(formGroup.controls.stateName)).toBeNull();

        });

	      it('should not give error if the countryName value is INDIA and upper case value in stateName FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'countryName':['INDIA'],
            'cityName':['AHMEDABAD'],
          });
          expect(RxwebValidators.upperCase({conditionalExpression:'x => x.countryName == "INDIA"'})(formGroup.controls.cityName)).toBeNull();

        });

	      it('should not give error if the countryName value is AUSTRALIA and non upper case value in stateName FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'countryName':['AUSTRALIA'],
            'stateName':['Queensland'],
          });
          expect(RxwebValidators.upperCase({conditionalExpression:(x,y) => x.countryName == "INDIA" })(formGroup.controls.stateName)).toBeNull();

        });

	      it('should not give error if the countryName value is AUSTRALIA and non upper case value in stateName FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'countryName':['AUSTRALIA'],
            'cityName':['Brisbane'],
          });
          expect(RxwebValidators.upperCase({conditionalExpression:'x => x.countryName == "INDIA"'})(formGroup.controls.cityName)).toBeNull();

        });


	      it('should not give error if the countryName value is INDIA and upper case value in stateName FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'countryName':['INDIA'],
            'stateName':['Gujarat'],
          });
          expect(RxwebValidators.upperCase({conditionalExpression:(x,y) => x.countryName == "INDIA" })(formGroup.controls.stateName)).toEqual({'upperCase':{ message: 'Only upper case are allowed.', refValues: [ 'Gujarat' ] } });

        });

	      it('should not give error if the countryName value is INDIA and upper case value in stateName FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'countryName':['INDIA'],
            'cityName':['Ahmedabad'],
          });
          expect(RxwebValidators.upperCase({conditionalExpression:'x => x.countryName == "INDIA"'})(formGroup.controls.cityName)).toEqual({'upperCase':{ message: 'Only upper case are allowed.', refValues: [ 'Ahmedabad' ] } });

        });




	      it('should give error, if the control contains a non upper case value.',
        () => {
          expect(RxwebValidators.upperCase({message:'You can enter only upperCase letters.'})(new FormControl('maninagar'))).toEqual({'upperCase':{ message: 'You can enter only upperCase letters.', refValues: [ 'maninagar' ] } });

        });



//end
    });
  });
})();

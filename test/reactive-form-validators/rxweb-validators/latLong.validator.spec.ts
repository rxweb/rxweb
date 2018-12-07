import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "latLong": "Please enter a valid latLong",
        }
      });
    });

    describe('latLong', () => {
      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.latLong()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.latLong()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.latLong()(new FormControl(undefined))).toBeNull(); 
        });

      it('should not give error on control which contains value which is proper Latitude or Longitude.',
        () => { 
          expect(RxwebValidators.latLong()(new FormControl('27.0238, 74.2179'))).toBeNull(); 
        });

      it('should give error on control which contains value which is not proper Latitude or Longitude..',
        () => { 
          expect(RxwebValidators.latLong()(new FormControl('20.'))).toEqual({'latLong':{ message: 'Please enter a valid latLong', refValues: [ '20.' ] } }); 
        });


	      it('should not give error if the continent value is Asia in secondCountry FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'continent':['Asia'],
            'secondCountry':['27.0238, 74.2179'],
          });
          expect(RxwebValidators.latLong({conditionalExpression:(x,y) => x.continent == "Asia" })(formGroup.controls.secondCountry)).toBeNull();

        });

	      it('should not give error if the continent value is Asia in thirdCountry FormControl with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'continent':['Asia'],
            'thirdCountry':['23.022505,72.571365'],
          });
          expect(RxwebValidators.latLong({conditionalExpression:'x => x.continent =="Asia"'})(formGroup.controls.thirdCountry)).toBeNull();

        });

	      it('should not give error if the continent value is Antartica and value in secondCountry FormControl is not valid latLong with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'continent':['Antartica'],
            'secondCountry':['19.'],
          });
          expect(RxwebValidators.latLong({conditionalExpression:(x,y) => x.continent == "Asia" })(formGroup.controls.secondCountry)).toBeNull();

        });

	      it('should not give error if the continent value is Antartica and value in thirdCountry FormControl  is not valid latLong with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'continent':['Antartica'],
            'thirdCountry':['20.'],
          });
          expect(RxwebValidators.latLong({conditionalExpression:'x => x.continent =="Asia"'})(formGroup.controls.thirdCountry)).toBeNull();

        });


	      it('should give error if the continent value is Asia and value in secondCountry FormControl is not valid latLong with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'continent':['Asia'],
            'secondCountry':['20.'],
          });
          expect(RxwebValidators.latLong({conditionalExpression:(x,y) => x.continent == "Asia" })(formGroup.controls.secondCountry)).toEqual({'latLong':{ message: 'Please enter a valid latLong', refValues: [ '20.' ] } });

        });

	      it('should give error if the continent value is Asia and value in thirdCountry FormControl is not valid latLong with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'continent':['Asia'],
            'thirdCountry':['19.'],
          });
          expect(RxwebValidators.latLong({conditionalExpression:'x => x.continent =="Asia"'})(formGroup.controls.thirdCountry)).toEqual({'latLong':{ message: 'Please enter a valid latLong', refValues: [ '19.' ] } });

        });




	      it('should give error if the control conatins value which is not valid Latitude or Longitude.',
        () => {
          expect(RxwebValidators.latLong({message:'{{0}} is not a proper proper Latitude or Longitude'})(new FormControl('20.'))).toEqual({'latLong':{ message: '20. is not a proper proper Latitude or Longitude', refValues: [ '20.' ] } });

        });



//end
    });
  });
})();

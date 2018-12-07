import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "longitude": "Please enter a valid longitude",
        }
      });
    });

    describe('longitude', () => {
      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.longitude()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.longitude()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.longitude()(new FormControl(undefined))).toBeNull(); 
        });

      it('should not give error on control which contains value which is proper longitude.',
        () => { 
          expect(RxwebValidators.longitude()(new FormControl('27.0238'))).toBeNull(); 
        });

      it('should give error on control which contains value which is not proper longitude.',
        () => { 
          expect(RxwebValidators.longitude()(new FormControl('20.'))).toEqual({'longitude':{ message: 'Please enter a valid longitude', refValues: [ '20.' ] } }); 
        });


	      it('should not give error if the continent value is Asia in secondCountryLongitude FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'continent':['Asia'],
            'secondCountryLongitude':['27.0238'],
          });
          expect(RxwebValidators.longitude({conditionalExpression:(x,y) => x.continent == "Asia" })(formGroup.controls.secondCountryLongitude)).toBeNull();

        });

	      it('should not give error if the continent value is Asia in thirdCountryLongitude FormControl with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'continent':['Asia'],
            'thirdCountryLongitude':['26.1234'],
          });
          expect(RxwebValidators.longitude({conditionalExpression:'x => x.continent =="Asia"'})(formGroup.controls.thirdCountryLongitude)).toBeNull();

        });

	      it('should not give error if the continent value is Antartica and value in secondCountryLongitude FormControl is not valid longitude with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'continent':['Antartica'],
            'secondCountryLongitude':['19.'],
          });
          expect(RxwebValidators.longitude({conditionalExpression:(x,y) => x.continent == "Asia" })(formGroup.controls.secondCountryLongitude)).toBeNull();

        });

	      it('should not give error if the continent value is Antartica and value in thirdCountryLongitude FormControl is not valid longitude with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'continent':['Antartica'],
            'thirdCountryLongitude':['20.'],
          });
          expect(RxwebValidators.longitude({conditionalExpression:'x => x.continent =="Asia"'})(formGroup.controls.thirdCountryLongitude)).toBeNull();

        });


	      it('should give error if the continent value is Asia and value in secondCountryLongitude FormControl is not valid longitude with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'continent':['Asia'],
            'secondCountryLongitude':['18.'],
          });
          expect(RxwebValidators.longitude({conditionalExpression:(x,y) => x.continent == "Asia" })(formGroup.controls.secondCountryLongitude)).toEqual({'longitude':{ message: 'Please enter a valid longitude', refValues: [ '18.' ] } });

        });

	      it('should give error if the continent value is Asia and value in thirdCountryLongitude FormControl is not valid longitude with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'continent':['Asia'],
            'thirdCountryLongitude':['19.'],
          });
          expect(RxwebValidators.longitude({conditionalExpression:'x => x.continent =="Asia"'})(formGroup.controls.thirdCountryLongitude)).toEqual({'longitude':{ message: 'Please enter a valid longitude', refValues: [ '19.' ] } });

        });




	      it('should give error if the control conatins value which is not valid longitude.',
        () => {
          expect(RxwebValidators.longitude({message:'{{0}} is not a longitude'})(new FormControl('27.'))).toEqual({'longitude':{ message: '27. is not a longitude', refValues: [ '27.' ] } });

        });



//end
    });
  });
})();

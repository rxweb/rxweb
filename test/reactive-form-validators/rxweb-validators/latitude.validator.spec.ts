import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "latitude": "Please enter a valid latitude",
        }
      });
    });

    describe('latitude', () => {
      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.latitude()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.latitude()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.latitude()(new FormControl(undefined))).toBeNull(); 
        });

      it('should not give error on control which contains value which is proper latitude.',
        () => { 
          expect(RxwebValidators.latitude()(new FormControl('20.1234'))).toBeNull(); 
        });

      it('should give error on control which contains value which is not proper latitude.',
        () => { 
          expect(RxwebValidators.latitude()(new FormControl('20.'))).toEqual({'latitude':{ message: 'Please enter a valid latitude', refValues: [ '20.' ] } }); 
        });


	      it('should not give error if the continent value is Asia in secondCountryLatitude FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'continent':['Asia'],
            'secondCountryLatitude':['20.5937'],
          });
          expect(RxwebValidators.latitude({conditionalExpression:(x,y) => x.continent == "Asia" })(formGroup.controls.secondCountryLatitude)).toBeNull();

        });

	      it('should not give error if the continent value is Asia in thirdCountryLatitude FormControl with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'continent':['Asia'],
            'thirdCountryLatitude':['19.1234'],
          });
          expect(RxwebValidators.latitude({conditionalExpression:'x => x.continent =="Asia"'})(formGroup.controls.thirdCountryLatitude)).toBeNull();

        });

	      it('should not give error if the continent value is Antartica and value in secondCountryLatitude FormControl is not valid latitude with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'continent':['Antartica'],
            'secondCountryLatitude':['19.'],
          });
          expect(RxwebValidators.latitude({conditionalExpression:(x,y) => x.continent == "Asia" })(formGroup.controls.secondCountryLatitude)).toBeNull();

        });

	      it('should not give error if the continent value is Antartica and value in thirdCountryLatitude FormControl  is not valid latitude with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'continent':['Antartica'],
            'thirdCountryLatitude':['20.'],
          });
          expect(RxwebValidators.latitude({conditionalExpression:'x => x.continent =="Asia"'})(formGroup.controls.thirdCountryLatitude)).toBeNull();

        });


	      it('should give error if the continent value is Asia and value in secondCountryLatitude FormControl is not valid latitude with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'continent':['Asia'],
            'secondCountryLatitude':['20.'],
          });
          expect(RxwebValidators.latitude({conditionalExpression:(x,y) => x.continent == "Asia" })(formGroup.controls.secondCountryLatitude)).toEqual({'latitude':{ message: 'Please enter a valid latitude', refValues: [ '20.' ] } });

        });

	      it('should give error if the continent value is Asia and value in thirdCountryLatitude FormControl is not valid latitude with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'continent':['Asia'],
            'thirdCountryLatitude':['19.'],
          });
          expect(RxwebValidators.latitude({conditionalExpression:'x => x.continent =="Asia"'})(formGroup.controls.thirdCountryLatitude)).toEqual({'latitude':{ message: 'Please enter a valid latitude', refValues: [ '19.' ] } });

        });




	      it('should give error if the control conatins value which is not valid latitude.',
        () => {
          expect(RxwebValidators.latitude({message:'{{0}} is not a latitude'})(new FormControl('20.'))).toEqual({'latitude':{ message: '20. is not a latitude', refValues: [ '20.' ] } });

        });



//end
    });
  });
})();

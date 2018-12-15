import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';



(function() {
  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "latitude": "Please enter a valid latitude",
        }
      });
    });

    describe('latitudeValidator', () => {

	      it("Should not error, latitude validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'continent':['Asia'],
            'secondCountryLatitude':'20.5937'
          });
          expect(RxwebValidators.latitude({conditionalExpression:(x,y) => x.continent == "Asia" })(formGroup.controls.secondCountryLatitude)).toBeNull()
        });

      it("Should not error, latitude validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'continent':['Africa'],
            'secondCountryLatitude':222
          });
          expect(RxwebValidators.latitude({conditionalExpression:(x,y) => x.continent == "Asia" })(formGroup.controls.secondCountryLatitude)).toBeNull()
        });


      it("Should error,  latitude validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'continent':['Asia'],
            'secondCountryLatitude':220
          });
          expect(RxwebValidators.latitude({conditionalExpression:(x,y) => x.continent == "Asia" })(formGroup.controls.secondCountryLatitude)).toEqual({'latitude':{ message: 'Please enter a valid latitude', refValues: [ 220 ] } }); 
        });


      it("Should not error, latitude validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'continent':['Asia'],
            'thirdCountryLatitude':'78.9629'
          });
          expect(RxwebValidators.latitude({conditionalExpression:'x => x.continent =="Asia"'})(formGroup.controls.thirdCountryLatitude)).toBeNull()
        });

      it("Should not error, latitude validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'continent':['Africa'],
            'thirdCountryLatitude':222
          });
          expect(RxwebValidators.latitude({conditionalExpression:'x => x.continent =="Asia"'})(formGroup.controls.thirdCountryLatitude)).toBeNull()
        });


      it("Should error,  latitude validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'continent':['Asia'],
            'thirdCountryLatitude':220
          });
          expect(RxwebValidators.latitude({conditionalExpression:'x => x.continent =="Asia"'})(formGroup.controls.thirdCountryLatitude)).toEqual({'latitude':{ message: 'Please enter a valid latitude', refValues: [ 220 ] } }); 
        });



      it("Should error, latitude validator Shows custom message.",
        () => { 
          expect(RxwebValidators.latitude({message:'{{0}} is not a latitude'})(new FormControl(230))).toEqual({'latitude':{ message: '230 is not a latitude', refValues: [ 230 ] } }); 
        });




	//end
    });
  });
})();

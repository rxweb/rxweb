import {FormBuilder, FormControl} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '@rxweb/reactive-form-validators';



  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "longitude": "Please enter a valid longitude",
        }
      });
    });

    describe('longitudeValidator', () => {

	      it("Should not error, longitude validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'continent':['Asia'],
            'secondCountryLongitude':'20.5937'
          });
          expect(RxwebValidators.longitude({conditionalExpression:(x,y) => x.continent == "Asia" })(formGroup.controls.secondCountryLongitude)).toBeNull()
        });

      it("Should not error, longitude validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'continent':['Africa'],
            'secondCountryLongitude':222
          });
          expect(RxwebValidators.longitude({conditionalExpression:(x,y) => x.continent == "Asia" })(formGroup.controls.secondCountryLongitude)).toBeNull()
        });


      it("Should error,  longitude validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'continent':['Asia'],
            'secondCountryLongitude':220
          });
          expect(RxwebValidators.longitude({conditionalExpression:(x,y) => x.continent == "Asia" })(formGroup.controls.secondCountryLongitude)).toEqual({'longitude':{ message: 'Please enter a valid longitude', refValues: [ 220 ] } }); 
        });


      it("Should not error, longitude validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'continent':['Asia'],
            'thirdCountryLongitude':'78.9629'
          });
          expect(RxwebValidators.longitude({conditionalExpression:'x => x.continent =="Asia"'})(formGroup.controls.thirdCountryLongitude)).toBeNull()
        });

      it("Should not error, longitude validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'continent':['Africa'],
            'thirdCountryLongitude':222
          });
          expect(RxwebValidators.longitude({conditionalExpression:'x => x.continent =="Asia"'})(formGroup.controls.thirdCountryLongitude)).toBeNull()
        });


      it("Should error,  longitude validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'continent':['Asia'],
            'thirdCountryLongitude':220
          });
          expect(RxwebValidators.longitude({conditionalExpression:'x => x.continent =="Asia"'})(formGroup.controls.thirdCountryLongitude)).toEqual({'longitude':{ message: 'Please enter a valid longitude', refValues: [ 220 ] } }); 
        });



      it("Should error, longitude validator Shows custom message.",
        () => { 
          expect(RxwebValidators.longitude({message:'{{0}} is not a longitude'})(new FormControl(230))).toEqual({'longitude':{ message: '230 is not a longitude', refValues: [ 230 ] } }); 
        });




	//end
    });
  });

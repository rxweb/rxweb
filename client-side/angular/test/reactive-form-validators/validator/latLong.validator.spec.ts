import {FormBuilder, FormControl} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '@rxweb/reactive-form-validators';



  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "latLong": "Please enter a valid latLong",
        }
      });
    });

    describe('latLongValidator', () => {

	      it("Should not error, latLong validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'continent':['Asia'],
            'secondCountry':'20.5937, 78.9629'
          });
          expect(RxwebValidators.latLong({conditionalExpression:(x,y) => x.continent == "Asia" })(formGroup.controls.secondCountry)).toBeNull()
        });

      it("Should not error, latLong validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'continent':['Africa'],
            'secondCountry':'222, 520'
          });
          expect(RxwebValidators.latLong({conditionalExpression:(x,y) => x.continent == "Asia" })(formGroup.controls.secondCountry)).toBeNull()
        });


      it("Should error,  latLong validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'continent':['Asia'],
            'secondCountry':'220, 520'
          });
          expect(RxwebValidators.latLong({conditionalExpression:(x,y) => x.continent == "Asia" })(formGroup.controls.secondCountry)).toEqual({'latLong':{ message: 'Please enter a valid latLong', refValues: [ '220, 520' ] } }); 
        });


      it("Should not error, latLong validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'continent':['Asia'],
            'thirdCountry':'78.9629, 20.5937'
          });
          expect(RxwebValidators.latLong({conditionalExpression:'x => x.continent =="Asia"'})(formGroup.controls.thirdCountry)).toBeNull()
        });

      it("Should not error, latLong validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'continent':['Africa'],
            'thirdCountry':'222, 5820'
          });
          expect(RxwebValidators.latLong({conditionalExpression:'x => x.continent =="Asia"'})(formGroup.controls.thirdCountry)).toBeNull()
        });


      it("Should error,  latLong validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'continent':['Asia'],
            'thirdCountry':'220, 6854'
          });
          expect(RxwebValidators.latLong({conditionalExpression:'x => x.continent =="Asia"'})(formGroup.controls.thirdCountry)).toEqual({'latLong':{ message: 'Please enter a valid latLong', refValues: [ '220, 6854' ] } }); 
        });



      it("Should error, latLong validator Shows custom message.",
        () => { 
          expect(RxwebValidators.latLong({message:'{{0}} is not a proper proper Latitude or Longitude'})(new FormControl('230, 845'))).toEqual({'latLong':{ message: '230, 845 is not a proper proper Latitude or Longitude', refValues: [ '230, 845' ] } }); 
        });




	//end
    });
  });

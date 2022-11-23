import {FormBuilder, FormControl} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '@rxweb/reactive-form-validators';



  describe('Validator', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "port": "Please enter a valid port number",
        }
      });
    });

    describe('portValidator', () => {

	      it("Should not error, port validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'browser':['Chrome'],
            'entertainmentWebsitePort':8080
          });
          expect(RxwebValidators.port({conditionalExpression:(x,y) => x.browser == "Chrome" })(formGroup.controls.entertainmentWebsitePort)).toBeNull()
        });

      it("Should not error, port validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'browser':['Firefox'],
            'entertainmentWebsitePort':80808
          });
          expect(RxwebValidators.port({conditionalExpression:(x,y) => x.browser == "Chrome" })(formGroup.controls.entertainmentWebsitePort)).toBeNull()
        });


      it("Should error,  port validator Conditional Expression with type 'function'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'browser':['Chrome'],
            'entertainmentWebsitePort':90009
          });
          expect(RxwebValidators.port({conditionalExpression:(x,y) => x.browser == "Chrome" })(formGroup.controls.entertainmentWebsitePort)).toEqual({'port':{ message: 'Please enter a valid port number', refValues: [ 90009 ] } }); 
        });


      it("Should not error, port validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'browser':['Chrome'],
            'shoppingWebsitePort':4200
          });
          expect(RxwebValidators.port({conditionalExpression:'x => x.browser =="Chrome"'})(formGroup.controls.shoppingWebsitePort)).toBeNull()
        });

      it("Should not error, port validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
'browser':['Firefox'],
            'shoppingWebsitePort':98754
          });
          expect(RxwebValidators.port({conditionalExpression:'x => x.browser =="Chrome"'})(formGroup.controls.shoppingWebsitePort)).toBeNull()
        });


      it("Should error,  port validator Conditional Expression with type 'string'",
         () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
			'browser':['Chrome'],
            'shoppingWebsitePort':88795
          });
          expect(RxwebValidators.port({conditionalExpression:'x => x.browser =="Chrome"'})(formGroup.controls.shoppingWebsitePort)).toEqual({'port':{ message: 'Please enter a valid port number', refValues: [ 88795 ] } }); 
        });



      it("Should error, port validator Shows custom message.",
        () => { 
          expect(RxwebValidators.port({message:'{{0}} is not a proper port number'})(new FormControl(88000))).toEqual({'port':{ message: '88000 is not a proper port number', refValues: [ 88000 ] } }); 
        });




	//end
    });
  });

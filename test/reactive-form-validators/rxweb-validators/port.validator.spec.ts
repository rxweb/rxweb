import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "port": "Please enter a valid port number",
        }
      });
    });

    describe('port', () => {
      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.port()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.port()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.port()(new FormControl(undefined))).toBeNull(); 
        });

      it('should not give error, if the control contains any port value',
        () => { 
          expect(RxwebValidators.port()(new FormControl(65510))).toBeNull(); 
        });

      it('should give error, if the control contains any non port value',
        () => { 
          expect(RxwebValidators.port()(new FormControl(65565))).toEqual({'port':{ message: 'Please enter a valid port number', refValues: [ 65565 ] } }); 
        });


	      it('should not give error if the browser value is Chrome and port value in entertainmentWebsitePort FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'browser':['Chrome'],
            'entertainmentWebsitePort':[65530],
          });
          expect(RxwebValidators.port({conditionalExpression:(x,y) => x.browser == "Chrome" })(formGroup.controls.entertainmentWebsitePort)).toBeNull();

        });

	      it('should not give error if the browser value is Chrome and port value in shoppingWebsitePort FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'browser':['Chrome'],
            'shoppingWebsitePort':[8000],
          });
          expect(RxwebValidators.port({conditionalExpression:'x => x.browser =="Chrome"'})(formGroup.controls.shoppingWebsitePort)).toBeNull();

        });

	      it('should not give error if the browser value is Firefox and non port value in entertainmentWebsitePort FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'browser':['Firefox'],
            'entertainmentWebsitePort':[65540],
          });
          expect(RxwebValidators.port({conditionalExpression:(x,y) => x.browser == "Chrome" })(formGroup.controls.entertainmentWebsitePort)).toBeNull();

        });

	      it('should not give error if the browser value is Firefox and non port value in shoppingWebsitePort FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'browser':['Firefox'],
            'shoppingWebsitePort':[65560],
          });
          expect(RxwebValidators.port({conditionalExpression:'x => x.browser =="Chrome"'})(formGroup.controls.shoppingWebsitePort)).toBeNull();

        });


	      it('should give error if the browser value is Chrome and non port value in entertainmentWebsitePort FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'browser':['Chrome'],
            'entertainmentWebsitePort':[65545],
          });
          expect(RxwebValidators.port({conditionalExpression:(x,y) => x.browser == "Chrome" })(formGroup.controls.entertainmentWebsitePort)).toEqual({'port':{ message: 'Please enter a valid port number', refValues: [ 65545 ] } });

        });

	      it('should give error if the browser value is Chrome and non port value in shoppingWebsitePort FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'browser':['Chrome'],
            'shoppingWebsitePort':[65565],
          });
          expect(RxwebValidators.port({conditionalExpression:'x => x.browser =="Chrome"'})(formGroup.controls.shoppingWebsitePort)).toEqual({'port':{ message: 'Please enter a valid port number', refValues: [ 65565 ] } });

        });




	      it('should give error, if the control contains a non port value',
        () => {
          expect(RxwebValidators.port({message:'{{0}} is not a proper port number'})(new FormControl(65565))).toEqual({'port':{ message: '65565 is not a proper port number', refValues: [ 65565 ] } });

        });



//end
    });
  });
})();

import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { RxwebValidators,ReactiveFormConfig  } from '../../../packages/reactive-form-validators';

(function() {
  describe('RxwebValidators', () => {
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "url": "Please enter proper url format",
        }
      });
    });

    describe('url', () => {
      it('should not error on an empty string.',
        () => { 
          expect(RxwebValidators.url()(new FormControl(''))).toBeNull();
        });
	
      it('should not error on null.',
        () => { 
          expect(RxwebValidators.url()(new FormControl(null))).toBeNull();
        });
	
      it('should not error on undefined.',
        () => { 
          expect(RxwebValidators.url()(new FormControl(undefined))).toBeNull(); 
        });

      it('should not give error, if the control contains a url value.',
        () => { 
          expect(RxwebValidators.url()(new FormControl('https://stackoverflow.com/'))).toBeNull(); 
        });

      it('should give error, if the control contains a non url value.',
        () => { 
          expect(RxwebValidators.url()(new FormControl('https:/@/stackoverflow.com/'))).toEqual({'url':{ message: 'Please enter proper url format', refValues: [ 'https:/@/stackoverflow.com/' ] } }); 
        });


	      it('should not give error if the adminWebsiteUrl value is https://google.co.in and url value in qaWebsiteUrl FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'adminWebsiteUrl':['https://google.co.in'],
            'qaWebsiteUrl':['https://stackoverflow.com/'],
          });
          expect(RxwebValidators.url({conditionalExpression:(x,y) => x.adminWebsiteUrl == "https://google.co.in" })(formGroup.controls.qaWebsiteUrl)).toBeNull();

        });

	      it('should not give error if the adminWebsiteUrl value is https://google.co.in and url value in customerWebsiteUrl FormControl with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'adminWebsiteUrl':['https://google.co.in'],
            'customerWebsiteUrl':['https://stackoverflow.com/'],
          });
          expect(RxwebValidators.url({conditionalExpression:'x => x.adminWebsiteUrl == "https://google.co.in"' })(formGroup.controls.customerWebsiteUrl)).toBeNull();

        });

	      it('should not give error if the adminWebsiteUrl value is https://www.google.com and non url value in customerWebsiteUrl FormControl with ConditionExpression with string.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'adminWebsiteUrl':['https://www.google.com'],
            'customerWebsiteUrl':['https:/@/stackoverflow.com/'],
          });
          expect(RxwebValidators.url({conditionalExpression:'x => x.adminWebsiteUrl == "https://google.co.in"' })(formGroup.controls.customerWebsiteUrl)).toBeNull();

        });

	      it('should not give error if the adminWebsiteUrl value is https://www.google.com and non url value in qaWebsiteUrl FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'adminWebsiteUrl':['https://www.google.com'],
            'qaWebsiteUrl':['https:/@/stackoverflow.com/'],
          });
          expect(RxwebValidators.url({conditionalExpression:(x,y) => x.adminWebsiteUrl == "https://google.co.in" })(formGroup.controls.qaWebsiteUrl)).toBeNull();

        });


	      it('should give error if the adminWebsiteUrl value is https://google.co.in and non url value in qaWebsiteUrl FormControl with ConditionExpression with Function.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'adminWebsiteUrl':['https://google.co.in'],
            'qaWebsiteUrl':['https:/@/stackoverflow.com/'],
          });
          expect(RxwebValidators.url({conditionalExpression:(x,y) => x.adminWebsiteUrl == "https://google.co.in" })(formGroup.controls.qaWebsiteUrl)).toEqual({'url':{ message: 'Please enter proper url format', refValues: [ 'https:/@/stackoverflow.com/' ] } });

        });

	      it('should give error if the adminWebsiteUrl value is https://google.co.in and non url value in customerWebsiteUrl FormControl with ConditionExpression with String.',
        () => {
          let formBuilder = new FormBuilder();
          let formGroup = formBuilder.group({
            'adminWebsiteUrl':['https://google.co.in'],
            'customerWebsiteUrl':['https:/@/stackoverflow.com/'],
          });
          expect(RxwebValidators.url({conditionalExpression:'x => x.adminWebsiteUrl == "https://google.co.in"' })(formGroup.controls.customerWebsiteUrl)).toEqual({'url':{ message: 'Please enter proper url format', refValues: [ 'https:/@/stackoverflow.com/' ] } });

        });




	      it('should give error, if the control contains a non url value.',
        () => {
          expect(RxwebValidators.url({message:'Is not the correct url pattern.'})(new FormControl('https:/@/stackoverflow.com/'))).toEqual({'url':{ message: 'Is not the correct url pattern.', refValues: [ 'https:/@/stackoverflow.com/' ] } });

        });



//end
    });
  });
})();

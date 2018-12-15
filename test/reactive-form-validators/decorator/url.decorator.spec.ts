
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators} from '@angular/forms';

import { ReactiveFormConfig,RxFormBuilder } from '../../../packages/reactive-form-validators';


import {  url, } from    '../../../packages/reactive-form-validators';  

export class User {

	@url() 
	adminWebsiteUrl: string;

	//If you want to apply conditional expression of type 'function'
	@url({conditionalExpression:(x,y) => x.adminWebsiteUrl == "https://google.co.in"  }) 
	qaWebsiteUrl: string;

	//If you want to apply conditional expression of type 'string'
	@url({conditionalExpression:'x => x.adminWebsiteUrl == "https://google.co.in"'  }) 
	customerWebsiteUrl: string;

	@url({message:'{{0}} Is not the correct url pattern.' }) 
	maintenanceWebSiteUrl: string;

}




(function() {
  describe('Decorator', () => {
    let formBuilder = new RxFormBuilder();
    beforeEach(() => {
      ReactiveFormConfig.set({
        "validationMessage": {
          "url": "Please enter proper url format",
        }
      });
    });

    describe('urlDecorator', () => {

	
	  it('should not error in countryName property with null value.',
        () => {
        let formGroup = formBuilder.formGroup(User);
        expect(formGroup.controls.adminWebsiteUrl.errors).toBeNull();
     });

	 it('should not error in countryName property with null value.',
        () => {
		let user = new User();
        user.adminWebsiteUrl = undefined;
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.adminWebsiteUrl.errors).toBeNull();
     });

	 it("Should not error, url decorator  If you want to apply conditional validation on 'QA Website Url' or 'Customer Website Url', then you need to add 'Admin Website Url' input as 'https://google.co.in'",
        () => {
		let user = new User();
        user.adminWebsiteUrl = undefined;
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.adminWebsiteUrl.errors).toBeNull();
     });

    it('adminWebsiteUrl value should be "https://stackoverflow.com/".',
        () => {
        let user = new User();
        user.adminWebsiteUrl = 'https://stackoverflow.com/';
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.adminWebsiteUrl.value).toEqual('https://stackoverflow.com/');
     });

	 it("Should error, url decorator If you want to apply conditional validation on 'QA Website Url' or 'Customer Website Url', then you need to add 'Admin Website Url' input as 'https://google.co.in'",
        () => {
		let user = new User();
        let formGroup = formBuilder.formGroup(user);
		formGroup.controls.adminWebsiteUrl.setValue('https:/@/stackoverflow.com/');
        expect(formGroup.controls.adminWebsiteUrl.errors).toEqual({'url':{ message: 'Please enter proper url format', refValues: [ 'https:/@/stackoverflow.com/' ] } });
     });


    it("Should not error, url decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.adminWebsiteUrl = 'https://google.co.in';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.qaWebsiteUrl.setValue('https://www.google.com/');
        expect(formGroup.controls.qaWebsiteUrl.errors).toBeNull();
     });

    it('qaWebsiteUrl value should be "https://www.google.com/".',
        () => {
        let user = new User();
        user.qaWebsiteUrl = 'https://www.google.com/';
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.qaWebsiteUrl.value).toEqual('https://www.google.com/');
     });
    it("Should not error, url decorator  Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.adminWebsiteUrl = 'https://www.npmjs.com/';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.qaWebsiteUrl.setValue('https:/@/www.google.com/');
        expect(formGroup.controls.qaWebsiteUrl.errors).toBeNull();
     });



    it("Should error, url decorator Conditional Expression with type 'function'",
        () => {
		let user = new User();
		user.adminWebsiteUrl = 'https://google.co.in';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.qaWebsiteUrl.setValue('https:/#/www.');
        expect(formGroup.controls.qaWebsiteUrl.errors).toEqual({'url':{ message: 'Please enter proper url format', refValues: [ 'https:/#/www.' ] } });
     });


    it("Should not error, url decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.adminWebsiteUrl = 'https://google.co.in';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.customerWebsiteUrl.setValue('https://angular.io/');
        expect(formGroup.controls.customerWebsiteUrl.errors).toBeNull();
     });

    it('customerWebsiteUrl value should be "https://angular.io/".',
        () => {
        let user = new User();
        user.customerWebsiteUrl = 'https://angular.io/';
        let formGroup = formBuilder.formGroup(user);
        expect(formGroup.controls.customerWebsiteUrl.value).toEqual('https://angular.io/');
     });
    it("Should not error, url decorator  Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.adminWebsiteUrl = 'https://github.com/';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.customerWebsiteUrl.setValue('https:/@/angular.io/');
        expect(formGroup.controls.customerWebsiteUrl.errors).toBeNull();
     });



    it("Should error, url decorator Conditional Expression with type 'string'",
        () => {
		let user = new User();
		user.adminWebsiteUrl = 'https://google.co.in';
        let formGroup = formBuilder.formGroup(user);
        formGroup.controls.customerWebsiteUrl.setValue('https:/#/angular.io/');
        expect(formGroup.controls.customerWebsiteUrl.errors).toEqual({'url':{ message: 'Please enter proper url format', refValues: [ 'https:/#/angular.io/' ] } });
     });



	 it("Should error, url decorator Shows Custom Validation Message.",
        () => {
		let user = new User();
        let formGroup = formBuilder.formGroup(user);
		formGroup.controls.maintenanceWebSiteUrl.setValue('https:/@/stackblitz.com/');
        expect(formGroup.controls.maintenanceWebSiteUrl.errors).toEqual({'url':{ message: 'https:/@/stackblitz.com/ Is not the correct url pattern.', refValues: [ 'https:/@/stackblitz.com/' ] } });
     });



	//end
    });
  });
})();

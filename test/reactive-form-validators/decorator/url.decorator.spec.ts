
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';

import { ReactiveFormConfig, RxFormBuilder } from '../../../packages/reactive-form-validators';

import { url, } from "../../../packages/reactive-form-validators"

export class User {

    @url()
    adminWebsiteUrl: string;

    //If you want to apply conditional expression of adminWebsiteUrl 'function'
    @url({ conditionalExpression: (x, y) => x.adminWebsiteUrl == "https://google.co.in" })
    qaWebsiteUrl: string;

    //If you want to apply conditional expression of adminWebsiteUrl 'string'
    @url({ conditionalExpression: 'x => x.adminWebsiteUrl == "https://google.co.in"' })
    customerWebsiteUrl: string;

    @url({ message: '{{0}} Is not the correct url pattern.' })
    maintenanceWebSiteUrl: string;

}


(function () {
    describe('Decorator', () => {
        let formBuilder = new RxFormBuilder();
        beforeEach(() => {
            ReactiveFormConfig.set({
                "validationMessage": {
                    "url": "Input must be an url",
                }
            });
        });

        describe('urlDecorator', () => {

            it('should not error in adminWebsiteUrl property with null value.',
                () => {
                    let formGroup = formBuilder.formGroup(User);
                    expect(formGroup.controls.adminWebsiteUrl.errors).toBeNull();
                });

            it('should not error in adminWebsiteUrl property with undefined value.',
                () => {
                    let user = new User();
                    user.adminWebsiteUrl = undefined;
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.adminWebsiteUrl.errors).toBeNull();
                });

            it('should not error in adminWebsiteUrl property with "https://stackoverflow.com/" value.',
                () => {
                    let user = new User();
                    user.adminWebsiteUrl = 'https://stackoverflow.com/';
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.adminWebsiteUrl.errors).toBeNull();
                });

            it("Should not error, url decorator  Conditional Expression with type 'function'",
                () => {
                    let user = new User();
                    user.adminWebsiteUrl = 'https://google.co.in';
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.qaWebsiteUrl.setValue('https://stackblitz.com/');
                    expect(formGroup.controls.qaWebsiteUrl.errors).toBeNull();
                });

            it('qaWebsiteUrl value should be "https://stackblitz.com/".',
                () => {
                    let user = new User();
                    user.qaWebsiteUrl = 'https://stackblitz.com/';
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.qaWebsiteUrl.value).toEqual('https://stackblitz.com/');
                });
            it("Should not error, url decorator  Conditional Expression with type 'function'",
                () => {
                    let user = new User();
                    user.adminWebsiteUrl = 'https://www.google.com';
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.qaWebsiteUrl.setValue('https:/@/github.com/');
                    expect(formGroup.controls.qaWebsiteUrl.errors).toBeNull();
                });



            it("Should error, url decorator Conditional Expression with type 'function'",
                () => {
                    let user = new User();
                    user.adminWebsiteUrl = 'https://google.co.in';
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.qaWebsiteUrl.setValue('https:/@/github.com/');
                    expect(formGroup.controls.qaWebsiteUrl.errors).toEqual({ 'url': { message: 'Input must be an url', refValues: ['https:/@/github.com/'] } });
                });


            it("Should not error, url decorator  Conditional Expression with type 'string'",
                () => {
                    let user = new User();
                    user.adminWebsiteUrl = 'https://google.co.in';
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.customerWebsiteUrl.setValue('https://www.amazon.com');
                    expect(formGroup.controls.customerWebsiteUrl.errors).toBeNull();
                });

            it('customerWebsiteUrl value should be "https://www.amazon.com".',
                () => {
                    let user = new User();
                    user.customerWebsiteUrl = 'https://www.amazon.com';
                    let formGroup = formBuilder.formGroup(user);
                    expect(formGroup.controls.customerWebsiteUrl.value).toEqual('https://www.amazon.com');
                });
            it("Should not error, url decorator  Conditional Expression with type 'string'",
                () => {
                    let user = new User();
                    user.adminWebsiteUrl = 'https://www.google.com';
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.customerWebsiteUrl.setValue('https:/#/www.amazon.com');
                    expect(formGroup.controls.customerWebsiteUrl.errors).toBeNull();
                });



            it("Should error, url decorator Conditional Expression with type 'string'",
                () => {
                    let user = new User();
                    user.adminWebsiteUrl = 'https://google.co.in';
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.customerWebsiteUrl.setValue('https:/#/www.amazon.com');
                    expect(formGroup.controls.customerWebsiteUrl.errors).toEqual({ 'url': { message: 'Input must be an url', refValues: ['https:/#/www.amazon.com'] } });
                });



            it("Should error, url decorator Shows custom message.",
                () => {
                    let user = new User();
                    let formGroup = formBuilder.formGroup(user);
                    formGroup.controls.maintenanceWebSiteUrl.setValue('https:/#/docs.microsoft.com');
                    expect(formGroup.controls.maintenanceWebSiteUrl.errors).toEqual({ 'url': { message: 'https:/#/docs.microsoft.com Is not the correct url pattern.', refValues: ['https:/#/docs.microsoft.com'] } });
                });
            //end
        });
    });
})();

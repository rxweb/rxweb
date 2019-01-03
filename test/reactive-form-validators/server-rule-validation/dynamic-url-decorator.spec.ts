import { ReactiveFormConfig, RxFormBuilder, FormBuilderConfiguration, RxFormGroup } from '../../../packages/reactive-form-validators';

import { url, prop, } from "../../../packages/reactive-form-validators"

export class User {

    @prop()
    adminWebsiteUrl: string;

    @prop()
	customerWebsiteUrl: string;

	@prop()
	maintenanceWebSiteUrl: string;

}


(function () {
    describe('Dynamic Validation decorator', () => {
        let formBuilder = new RxFormBuilder();
        beforeEach(() => {
            ReactiveFormConfig.set({
                "validationMessage": {
                    "url": "Input must be an url",
                }
            });
        });
        describe('url dynamic validation', () => {
            let user = new User();
            it('should not error in areaName adding dynamic url validation',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        adminWebsiteUrl: {
                            url: true
                        }
                    };
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.adminWebsiteUrl.setValue('https://www.google.com/');
                    expect(userFormGroup.controls.adminWebsiteUrl.errors).toBeNull();
                });

            it('should error in areaName adding dynamic url validation',
                () => {
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        adminWebsiteUrl: {
                            url: true
                        }
                    };
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.adminWebsiteUrl.setValue('https:/@/www.google.com/');
                    expect(userFormGroup.controls.adminWebsiteUrl.errors).toEqual({ 'url': { message: 'Input must be an url', refValues: ['https:/@/www.google.com/'] } });
                });

                it('should not error in customerWebsiteUrl with conditional expression in dynamic url validation with string.',
                () =>{
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        adminWebsiteUrl : {
                            url : true  
                        },
                        customerWebsiteUrl : {
                            url :  {conditionalExpression:'x => x.adminWebsiteUrl == "https://google.co.in"',} 
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.adminWebsiteUrl.setValue('https://google.co.in'); 
                    userFormGroup.controls.customerWebsiteUrl.setValue('https://stackblitz.com/');
                    expect(userFormGroup.controls.customerWebsiteUrl.errors).toBeNull();
                });

                it('should not error in customerWebsiteUrl with conditional expression in dynamic url validation with string.',
                () =>{
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        adminWebsiteUrl : {
                            url : true  
                        },
                        customerWebsiteUrl : {
                            url :  {conditionalExpression:'x => x.adminWebsiteUrl == "https://google.co.in"',} 
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.adminWebsiteUrl.setValue('https://www.google.com'); 
                    userFormGroup.controls.customerWebsiteUrl.setValue('https:/#/www.amazon.com');
                    expect(userFormGroup.controls.customerWebsiteUrl.errors).toBeNull();
                });

                it('should error in customerWebsiteUrl with conditional expression in dynamic url validation with string.',
                () =>{
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        adminWebsiteUrl : {
                            url : true  
                        },
                        customerWebsiteUrl : {
                            url :  {conditionalExpression:'x => x.adminWebsiteUrl == "https://google.co.in"',} 
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.adminWebsiteUrl.setValue('https://google.co.in'); 
                    userFormGroup.controls.customerWebsiteUrl.setValue('https:/@/stackblitz.com/');
                    expect(userFormGroup.controls.customerWebsiteUrl.errors).toEqual({'url':{ message: 'Input must be an url', refValues: [ 'https:/@/stackblitz.com/' ] } });
                });

                it('should error in maintenanceWebSiteUrl adding custom message in dynamic url validation.',
                () =>{
                    let formBuilderConfiguration = new FormBuilderConfiguration();
                    formBuilderConfiguration.dynamicValidation = {
                        maintenanceWebSiteUrl : {
                            url :  {message:'Is not the correct url pattern.',} 
                        }
                    }
                    let userFormGroup = <RxFormGroup>formBuilder.formGroup(user, formBuilderConfiguration);
                    userFormGroup.controls.maintenanceWebSiteUrl.setValue('https:/#/docs.microsoft.com');
                    expect(userFormGroup.controls.maintenanceWebSiteUrl.errors).toEqual({'url':{ message: 'Is not the correct url pattern.', refValues: [ 'https:/#/docs.microsoft.com' ] } });
                });
            //end
        });
    });
})();
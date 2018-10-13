import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-url-dynamic-validator',
    templateUrl: './url-dynamic.component.html'
})
export class UrlDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			adminWebsiteUrl : {
				url : true  
			},
						
			qaWebsiteUrl : {
				url :  {conditionalExpression:(x,y) =>{ return  x.adminWebsiteUrl == "https://google.co.in" },} 
			},
						
			customerWebsiteUrl : {
				url :  {conditionalExpression:x => x.adminWebsiteUrl == "https://google.co.in" ,} 
			},
						
			maintenanceWebSiteUrl : {
				url :  {message:'Is not the correct url pattern.',} 
			},
			        };
		 var user = {
			adminWebsiteUrl:'', qaWebsiteUrl:'', customerWebsiteUrl:'', maintenanceWebSiteUrl:'', 
		}
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}

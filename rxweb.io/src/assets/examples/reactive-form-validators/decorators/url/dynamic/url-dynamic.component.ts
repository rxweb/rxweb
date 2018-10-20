import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { User } from './user.model';

@Component({
    selector: 'app-url-dynamic',
    templateUrl: './url-dynamic.component.html'
})
export class UrlDynamicComponent implements OnInit {

    userFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let user = new User();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			adminWebsiteUrl : {
				url : true  
			},
						
			qaWebsiteUrl : {
				url :  {conditionalExpression:(x,y) => x.adminWebsiteUrl == "https://google.co.in" ,} 
			},
						
			customerWebsiteUrl : {
				url :  {conditionalExpression:'x => x.adminWebsiteUrl == "https://google.co.in"' ,} 
			},
						
			maintenanceWebSiteUrl : {
				url :  {message:'Is not the correct url pattern.',} 
			},
			        };
		this.userFormGroup = this.formBuilder.formGroup(user,formBuilderConfiguration);
    }
}

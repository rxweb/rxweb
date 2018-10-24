import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-url-dynamic-validator',
    templateUrl: './url-dynamic.component.html'
})
export class UrlDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			adminWebsiteUrl : {
				url :true  
			},			
			customerWebsiteUrl : {
				url : {conditionalExpression:'x => x.adminWebsiteUrl == "https://google.co.in"' ,} 
			},			
			maintenanceWebSiteUrl : {
				url : {message:'Is not the correct url pattern.',} 
			},
		};
		var user = { adminWebsiteUrl:'', qaWebsiteUrl:'', customerWebsiteUrl:'', maintenanceWebSiteUrl:'',  }
		this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
    }
}

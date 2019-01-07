import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';
import { FormBuilderConfiguration,RxFormBuilder} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-ip-dynamic-validator',
    templateUrl: './ip-dynamic.component.html'
})
export class IpDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

				ipTypes = [ "V4", "V6", "AnyOne",];
	
	
	
	
	
	
	
	
	
	constructor(
        private formBuilder: RxFormBuilder , private http: HttpClient )
	{ }

    ngOnInit() {
		let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/validators/ip/dynamic/dynamic.json').subscribe(dynamic => {
			formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			var user = { ipType:'', ipV4:'', ipV6:'', anyIPType:'', ipV4Cidr:'', ipV6Cidr:'', ipV6Conditional:'', ipV4Conditional:'', ipV4Message:'',  }
			this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
		})
    }
}

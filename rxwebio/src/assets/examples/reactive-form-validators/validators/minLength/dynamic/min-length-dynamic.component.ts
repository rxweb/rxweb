import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';
import { FormBuilderConfiguration,RxFormBuilder} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minLength-dynamic-validator',
    templateUrl: './min-length-dynamic.component.html'
})
export class MinLengthDynamicValidatorComponent implements OnInit {
    contactFormGroup: FormGroup

	constructor(
        private formBuilder: RxFormBuilder , private http: HttpClient )
	{ }

    ngOnInit() {
		let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/validators/minLength/dynamic/dynamic.json').subscribe(dynamic => {
			formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			var contact = { countryName:'', mobileNo:'', landLineNo:'', countryCode:'', stateCode:'',  }
			this.contactFormGroup = this.formBuilder.group(contact,formBuilderConfiguration);
		})
    }
}

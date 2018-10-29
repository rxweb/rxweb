import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-different-dynamic-validator',
    templateUrl: './different-dynamic.component.html'
})
export class DifferentDynamicValidatorComponent implements OnInit {
    accountInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder , private http: HttpClient )
	{ }

    ngOnInit() {
		let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/validators/different/dynamic/dynamic.json').subscribe(dynamic => {
			formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			var accountInfo = { firstName:'', password:'', lastName:'', userName:'',  }
			this.accountInfoFormGroup = this.formBuilder.group(accountInfo,formBuilderConfiguration);
		})
    }
}

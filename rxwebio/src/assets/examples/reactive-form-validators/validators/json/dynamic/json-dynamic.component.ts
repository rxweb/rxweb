import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';
import { FormBuilderConfiguration,RxFormBuilder} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-json-dynamic-validator',
    templateUrl: './json-dynamic.component.html'
})
export class JsonDynamicValidatorComponent implements OnInit {
    jsonInfoFormGroup: FormGroup

	constructor(
        private formBuilder: RxFormBuilder , private http: HttpClient )
	{ }

    ngOnInit() {
		let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/validators/json/dynamic/dynamic.json').subscribe(dynamic => {
			formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			var jsonInfo = { location:'', addressJson:'', locationJson:'', contactJson:'',  }
			this.jsonInfoFormGroup = this.formBuilder.group(jsonInfo,formBuilderConfiguration);
		})
    }
}

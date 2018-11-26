import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-upperCase-dynamic-validator',
    templateUrl: './upper-case-dynamic.component.html'
})
export class UpperCaseDynamicValidatorComponent implements OnInit {
    locationFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder , private http: HttpClient )
	{ }

    ngOnInit() {
		let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/validators/upperCase/dynamic/dynamic.json').subscribe(dynamic => {
			formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			var location = { countryName:'', stateName:'', cityName:'', colonyName:'',  }
			this.locationFormGroup = this.formBuilder.group(location,formBuilderConfiguration);
		})
    }
}

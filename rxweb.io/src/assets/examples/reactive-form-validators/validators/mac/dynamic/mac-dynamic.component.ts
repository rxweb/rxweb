import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-mac-dynamic-validator',
    templateUrl: './mac-dynamic.component.html'
})
export class MacDynamicValidatorComponent implements OnInit {
    macAddressInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder , private http: HttpClient )
	{ }

    ngOnInit() {
		let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/validators/mac/dynamic/dynamic.json').subscribe(dynamic => {
			formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			var macAddressInfo = { device:'', macAddress:'', localMacAddress:'', systemMacAddress:'',  }
			this.macAddressInfoFormGroup = this.formBuilder.group(macAddressInfo,formBuilderConfiguration);
		})
    }
}

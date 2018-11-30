import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';
import { FormBuilderConfiguration,RxFormBuilder} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-greaterThanEqualTo-dynamic-validator',
    templateUrl: './greater-than-equal-to-dynamic.component.html'
})
export class GreaterThanEqualToDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: RxFormBuilder , private http: HttpClient )
	{ }

    ngOnInit() {
		let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/validators/greaterThanEqualTo/dynamic/dynamic.json').subscribe(dynamic => {
			formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			var user = { admissionAge:'', retiermentAge:'', voterAge:'', memberAge:'', otherAge:'',  }
			this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
		})
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';
import { FormBuilderConfiguration,RxFormBuilder} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-ascii-dynamic-validator',
    templateUrl: './ascii-dynamic.component.html'
})
export class AsciiDynamicValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: RxFormBuilder , private http: HttpClient )
	{ }

    ngOnInit() {
		let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/validators/ascii/dynamic/dynamic.json').subscribe(dynamic => {
			formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			var user = { language:'', numberAsciiCode:'', alphabetAsciiCode:'', specialCharAsciiCode:'',  }
			this.userFormGroup = this.formBuilder.group(user,formBuilderConfiguration);
		})
    }
}

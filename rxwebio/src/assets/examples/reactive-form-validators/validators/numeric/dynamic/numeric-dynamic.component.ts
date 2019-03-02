import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators ,NumericValueType} from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';
import { FormBuilderConfiguration,RxFormBuilder} from '@rxweb/reactive-form-validators';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-numeric-dynamic-validator',
    templateUrl: './numeric-dynamic.component.html'
})
export class NumericDynamicValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

				dataTypes = [ "Real", "Integer",];
	
	
	
	
	
	
	constructor(
        private formBuilder: RxFormBuilder , private http: HttpClient )
	{ }

    ngOnInit() {
		let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/validators/numeric/dynamic/dynamic.json?v='+environment.appVersion).subscribe(dynamic => {
			formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			var userInfo = { dataType:'', negativeNumber:'', decimalNumber:'', integerNumber:'', realNumber:'', positiveNumber:'',  }
			this.userInfoFormGroup = this.formBuilder.group(userInfo,formBuilderConfiguration);
		})
    }
}

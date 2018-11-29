import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';
import { FormBuilderConfiguration,RxFormBuilder} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-primeNumber-dynamic-validator',
    templateUrl: './prime-number-dynamic.component.html'
})
export class PrimeNumberDynamicValidatorComponent implements OnInit {
    numberInfoFormGroup: FormGroup

	constructor(
        private formBuilder: RxFormBuilder , private http: HttpClient )
	{ }

    ngOnInit() {
		let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/validators/primeNumber/dynamic/dynamic.json').subscribe(dynamic => {
			formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			var numberInfo = { numberType:'', secondNumber:'', thirdNumber:'', firstNumber:'',  }
			this.numberInfoFormGroup = this.formBuilder.group(numberInfo,formBuilderConfiguration);
		})
    }
}

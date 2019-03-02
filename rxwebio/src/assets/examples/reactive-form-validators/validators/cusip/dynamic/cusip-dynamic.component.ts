import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';
import { FormBuilderConfiguration,RxFormBuilder} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-cusip-dynamic-validator',
    templateUrl: './cusip-dynamic.component.html'
})
export class CusipDynamicValidatorComponent implements OnInit {
    companyInfoFormGroup: FormGroup

				companyNames = [ "Google", "Microsoft",];
	
	
	
	
	
	constructor(
        private formBuilder: RxFormBuilder , private http: HttpClient )
	{ }

    ngOnInit() {
		let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/validators/cusip/dynamic/dynamic.json').subscribe(dynamic => {
			formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			var companyInfo = { companyName:'', oracleCorporationCusipCode:'', googleIncCusipCode:'', microsoftCorporationCusipCode:'', appleIncCusipCode:'',  }
			this.companyInfoFormGroup = this.formBuilder.group(companyInfo,formBuilderConfiguration);
		})
    }
}

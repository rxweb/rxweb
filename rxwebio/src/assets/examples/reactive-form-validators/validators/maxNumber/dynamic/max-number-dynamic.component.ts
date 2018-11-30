import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-maxNumber-dynamic-validator',
    templateUrl: './max-number-dynamic.component.html'
})
export class MaxNumberDynamicValidatorComponent implements OnInit {
    subjectDetailsFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder , private http: HttpClient )
	{ }

    ngOnInit() {
		let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/validators/maxNumber/dynamic/dynamic.json').subscribe(dynamic => {
			formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			var subjectDetails = { subjectCode:'', maximumMarks:'', obtainedMarks:'', passingMarks:'',  }
			this.subjectDetailsFormGroup = this.formBuilder.group(subjectDetails,formBuilderConfiguration);
		})
    }
}

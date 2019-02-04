import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';
import { FormBuilderConfiguration,RxFormBuilder} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-grid-dynamic-validator',
    templateUrl: './grid-dynamic.component.html'
})
export class GridDynamicValidatorComponent implements OnInit {
    digitalInfoFormGroup: FormGroup

	constructor(
        private formBuilder: RxFormBuilder , private http: HttpClient )
	{ }

    ngOnInit() {
		let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/validators/grid/dynamic/dynamic.json').subscribe(dynamic => {
			formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			var digitalInfo = { soundRecordingGrid:'', audioVisualRecordingGrid:'', photographGrid:'', graphicImageGrid:'',  }
			this.digitalInfoFormGroup = this.formBuilder.group(digitalInfo,formBuilderConfiguration);
		})
    }
}

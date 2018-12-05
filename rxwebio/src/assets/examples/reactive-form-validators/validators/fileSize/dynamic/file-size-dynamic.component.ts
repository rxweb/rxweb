import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { HttpClient } from '@angular/common/http';
import { FormBuilderConfiguration,RxFormBuilder} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-fileSize-dynamic-validator',
    templateUrl: './file-size-dynamic.component.html'
})
export class FileSizeDynamicValidatorComponent implements OnInit {
    storageCapacityFormGroup: FormGroup

	constructor(
        private formBuilder: RxFormBuilder , private http: HttpClient )
	{ }

    ngOnInit() {
		let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/validators/fileSize/dynamic/dynamic.json').subscribe(dynamic => {
			formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			var storageCapacity = { device:'', documentStorageSize:'', photographStorageSize:'', videoStorageSize:'',  }
			this.storageCapacityFormGroup = this.formBuilder.group(storageCapacity,formBuilderConfiguration);
		})
    }
}

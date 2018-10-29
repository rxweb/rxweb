import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';
import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,} from '@rxweb/reactive-form-validators';

import { StorageCapacity } from './storage-capacity.model';

@Component({
    selector: 'app-fileSize-dynamic',
    templateUrl: './file-size-dynamic.component.html'
})
export class FileSizeDynamicComponent implements OnInit {
    storageCapacityFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,private http: HttpClient    ) { }

    ngOnInit() {
        let storageCapacity = new StorageCapacity();
        let formBuilderConfiguration = new FormBuilderConfiguration();
		this.http.get('assets/examples/reactive-form-validators/decorators/fileSize/dynamic/dynamic.json').subscribe(dynamic => {
            formBuilderConfiguration.dynamicValidation = JSON.parse(JSON.stringify(dynamic));
			this.storageCapacityFormGroup = this.formBuilder.formGroup(storageCapacity,formBuilderConfiguration);
        })
    }
}

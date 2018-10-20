import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { StorageCapacity } from './storage-capacity.model';

@Component({
    selector: 'app-fileSize-edit',
    templateUrl: './file-size-edit.component.html'
})
export class FileSizeEditComponent implements OnInit {

    storageCapacityFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder,		private http: HttpClient

    ) { }

    ngOnInit() {
        this.http.get('assets/examples/reactive-form-validators/decorators/fileSize/edit/storage-capacity-data.json').subscribe(storageCapacity => {
            this.storageCapacityFormGroup = this.formBuilder.formGroup<StorageCapacity>(StorageCapacity,storageCapacity);
        })
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-fileSize-add-validator',
    templateUrl: './file-size-add.component.html'
})
export class FileSizeAddValidatorComponent implements OnInit {
    storageCapacityFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.storageCapacityFormGroup = this.formBuilder.group({
            videoStorageSize:['', RxwebValidators.fileSize({maxSize:50 })], 
        });
    }
}

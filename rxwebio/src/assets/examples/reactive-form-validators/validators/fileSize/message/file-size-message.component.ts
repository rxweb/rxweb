import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-fileSize-message-validator',
    templateUrl: './file-size-message.component.html'
})
export class FileSizeMessageValidatorComponent implements OnInit {
    storageCapacityFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.storageCapacityFormGroup = this.formBuilder.group({
            videoStorageSize:['', RxwebValidators.fileSize({maxSize:50  ,message:'{{0}} is not a valid size' })], 
        });
    }
}

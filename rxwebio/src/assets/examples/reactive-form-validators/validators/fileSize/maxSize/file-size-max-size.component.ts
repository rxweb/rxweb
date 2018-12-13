import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-fileSize-maxSize-validator',
    templateUrl: './file-size-max-size.component.html'
})
export class FileSizeMaxSizeValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            videoFile:['', RxwebValidators.fileSize({maxSize:100 })], 
        });
    }
}

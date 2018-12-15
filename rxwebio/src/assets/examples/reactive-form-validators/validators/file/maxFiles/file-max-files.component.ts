import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-file-maxFiles-validator',
    templateUrl: './file-max-files.component.html'
})
export class FileMaxFilesValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            totalImageFiles:['', RxwebValidators.file({maxFiles:5 })], 
        });
    }
}

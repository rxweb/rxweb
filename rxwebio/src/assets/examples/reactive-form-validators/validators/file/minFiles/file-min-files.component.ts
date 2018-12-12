import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-file-minFiles-validator',
    templateUrl: './file-min-files.component.html'
})
export class FileMinFilesValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            totalDocumentFiles:['', RxwebValidators.file({minFiles:5 })], 
        });
    }
}

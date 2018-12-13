import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-file-add-validator',
    templateUrl: './file-add.component.html'
})
export class FileAddValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            totalImageFiles:['', RxwebValidators.file({maxFiles:5 })], 
            totalDocumentFiles:['', RxwebValidators.file({minFiles:5 })], 
        });
    }
}

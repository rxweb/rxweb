import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-fileSize-message-validator',
    templateUrl: './file-size-message.component.html'
})
export class FileSizeMessageValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            contactFile:['', RxwebValidators.fileSize({maxSize:10  ,message:'File exceed maximum size.' })], 
        });
    }
}

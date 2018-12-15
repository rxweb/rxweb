import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-file-message-validator',
    templateUrl: './file-message.component.html'
})
export class FileMessageValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            minMaxFiles:['', RxwebValidators.file({minFiles:5  ,maxFiles:10  ,message:'You can upload minimum 5 and maximum 10 files.' })], 
        });
    }
}

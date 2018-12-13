import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-fileSize-minSize-validator',
    templateUrl: './file-size-min-size.component.html'
})
export class FileSizeMinSizeValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            audioFile:['', RxwebValidators.fileSize({minSize:3  ,maxSize:100 })], 
        });
    }
}

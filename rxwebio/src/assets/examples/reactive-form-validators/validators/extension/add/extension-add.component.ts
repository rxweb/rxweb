import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-extension-add-validator',
    templateUrl: './extension-add.component.html'
})
export class ExtensionAddValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            profilePicture:['', RxwebValidators.extension({extensions:['jpg','bmp'] })], 
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-extension-extensions-validator',
    templateUrl: './extension-extensions.component.html'
})
export class ExtensionExtensionsValidatorComponent implements OnInit {
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

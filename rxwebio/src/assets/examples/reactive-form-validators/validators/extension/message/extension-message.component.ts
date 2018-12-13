import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-extension-message-validator',
    templateUrl: './extension-message.component.html'
})
export class ExtensionMessageValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            contactFile:['', RxwebValidators.extension({extensions:['vcf']  ,message:'You can upload only .vcf files.' })], 
        });
    }
}

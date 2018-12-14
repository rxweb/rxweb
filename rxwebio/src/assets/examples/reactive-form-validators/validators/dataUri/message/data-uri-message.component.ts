import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-dataUri-message-validator',
    templateUrl: './data-uri-message.component.html'
})
export class DataUriMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            videoDataUri:['', RxwebValidators.dataUri({message:'{{0}} is not a proper data URI' })], 
        });
    }
}

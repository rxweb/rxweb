import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-url-message-validator',
    templateUrl: './url-message.component.html'
})
export class UrlMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            maintenanceWebSiteUrl:['', RxwebValidators.url({message:'{{0}} Is not the correct url pattern.' })], 
        });
    }
}

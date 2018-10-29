import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-url-add-validator',
    templateUrl: './url-add.component.html'
})
export class UrlAddValidatorComponent implements OnInit {
    webSiteInfoModelFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.webSiteInfoModelFormGroup = this.formBuilder.group({
            adminWebsiteUrl:['', RxwebValidators.url()], 
        });
    }
}

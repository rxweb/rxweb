import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-json-message-validator',
    templateUrl: './json-message.component.html'
})
export class JsonMessageValidatorComponent implements OnInit {
    jsonInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.jsonInfoFormGroup = this.formBuilder.group({
            location:['',], 
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-json-add-validator',
    templateUrl: './json-add.component.html'
})
export class JsonAddValidatorComponent implements OnInit {
    jsonInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.jsonInfoFormGroup = this.formBuilder.group({
            locationJson:['', RxwebValidators.json()], 
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-alphaNumeric-add-validator',
    templateUrl: './alpha-numeric-add.component.html'
})
export class AlphaNumericAddValidatorComponent implements OnInit {
    locationFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.locationFormGroup = this.formBuilder.group({
            areaName:['', RxwebValidators.alphaNumeric()], 
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minLength-message-validator',
    templateUrl: './min-length-message.component.html'
})
export class MinLengthMessageValidatorComponent implements OnInit {
    contactFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.contactFormGroup = this.formBuilder.group({
            landLineNo:['', RxwebValidators.minLength({value:8  ,message:'Minimum 8 characters are allowed' })], 
        });
    }
}

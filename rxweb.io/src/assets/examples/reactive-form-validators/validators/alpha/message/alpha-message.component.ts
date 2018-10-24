import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-alpha-message-validator',
    templateUrl: './alpha-message.component.html'
})
export class AlphaMessageValidatorComponent implements OnInit {
    addressInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.addressInfoFormGroup = this.formBuilder.group({
            stateCode:['', RxwebValidators.alpha({message:'You can enter only alphabets.' })], 
        });
    }
}

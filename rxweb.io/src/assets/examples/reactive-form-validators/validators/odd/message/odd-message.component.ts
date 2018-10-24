import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-odd-message-validator',
    templateUrl: './odd-message.component.html'
})
export class OddMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            multiplesOfOddNumber:['', RxwebValidators.odd({message:'{{0}} is not an odd number' })], 
        });
    }
}

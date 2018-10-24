import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-even-message-validator',
    templateUrl: './even-message.component.html'
})
export class EvenMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            multiplesOfEvenNumber:['', RxwebValidators.even({message:'{{0}} is not an even number' })], 
        });
    }
}

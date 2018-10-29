import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-time-message-validator',
    templateUrl: './time-message.component.html'
})
export class TimeMessageValidatorComponent implements OnInit {
    attandanceDetailFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.attandanceDetailFormGroup = this.formBuilder.group({
            exitTime:['', RxwebValidators.time({message:'You can enter only time format data' })], 
        });
    }
}

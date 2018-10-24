import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-time-add-validator',
    templateUrl: './time-add.component.html'
})
export class TimeAddValidatorComponent implements OnInit {
    attandanceDetailFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.attandanceDetailFormGroup = this.formBuilder.group({
            entryTime:['', RxwebValidators.time()], 
        });
    }
}

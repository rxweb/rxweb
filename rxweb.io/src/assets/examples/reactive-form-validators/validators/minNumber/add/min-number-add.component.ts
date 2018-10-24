import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minNumber-add-validator',
    templateUrl: './min-number-add.component.html'
})
export class MinNumberAddValidatorComponent implements OnInit {
    resultInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.resultInfoFormGroup = this.formBuilder.group({
            maths:['', RxwebValidators.minNumber({value:35 })], 
        });
    }
}

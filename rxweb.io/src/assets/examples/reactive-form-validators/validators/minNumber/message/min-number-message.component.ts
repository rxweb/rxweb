import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minNumber-message-validator',
    templateUrl: './min-number-message.component.html'
})
export class MinNumberMessageValidatorComponent implements OnInit {
    resultInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.resultInfoFormGroup = this.formBuilder.group({
            science:['', RxwebValidators.minNumber({value:35  ,message:'Number should not be less than 35' })], 
        });
    }
}

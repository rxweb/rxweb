import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minNumber-value-validator',
    templateUrl: './min-number-value.component.html'
})
export class MinNumberValueValidatorComponent implements OnInit {
    resultInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.resultInfoFormGroup = this.formBuilder.group({
            english:['', RxwebValidators.minNumber({value:35  ,conditionalExpression:(x,y) => x.maths == 50  })], 
        });
    }
}

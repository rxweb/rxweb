import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-time-conditionalExpression-validator',
    templateUrl: './time-conditional-expression.component.html'
})
export class TimeConditionalExpressionValidatorComponent implements OnInit {
    attandanceDetailFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.attandanceDetailFormGroup = this.formBuilder.group({
            entryPlace:['',], 
            entryTime:['', RxwebValidators.time({conditionalExpression:'x => x.entryPlace == "Lunch Room"' })], 
            totalIn:['', RxwebValidators.time({conditionalExpression:(x,y) => x.entryPlace == "Lunch Room"  })], 
        });
    }
}

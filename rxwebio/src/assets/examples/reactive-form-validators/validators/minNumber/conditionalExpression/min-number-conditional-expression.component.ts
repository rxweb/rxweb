import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minNumber-conditionalExpression-validator',
    templateUrl: './min-number-conditional-expression.component.html'
})
export class MinNumberConditionalExpressionValidatorComponent implements OnInit {
    resultInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.resultInfoFormGroup = this.formBuilder.group({
            maths:['', RxwebValidators.minNumber({value:35 })], 
            statstics:['', RxwebValidators.minNumber({value:35  ,conditionalExpression:'x => x.maths == 50' })], 
            english:['', RxwebValidators.minNumber({value:35  ,conditionalExpression:(x,y) => x.maths == 50  })], 
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-even-conditionalExpression-validator',
    templateUrl: './even-conditional-expression.component.html'
})
export class EvenConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            type:['',], 
            evenNumber:['', RxwebValidators.even({conditionalExpression:'x => x.type == "Even"' })], 
            number:['', RxwebValidators.even({conditionalExpression:(x,y) => x.type == "Even"  })], 
        });
    }
}

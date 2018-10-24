import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-required-conditionalExpression-validator',
    templateUrl: './required-conditional-expression.component.html'
})
export class RequiredConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            firstName:['', RxwebValidators.required()], 
            lastName:['', RxwebValidators.required({conditionalExpression:'x => x.firstName == "Bharat"' })], 
            middleName:['', RxwebValidators.required({conditionalExpression:(x,y) => x.firstName == "Bharat"  })], 
        });
    }
}

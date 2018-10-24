import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-odd-conditionalExpression-validator',
    templateUrl: './odd-conditional-expression.component.html'
})
export class OddConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            type:['',], 
            oddNumber:['', RxwebValidators.odd({conditionalExpression:'x => x.type == "Odd"' })], 
            number:['', RxwebValidators.odd({conditionalExpression:(x,y) => x.type == "Odd"  })], 
        });
    }
}

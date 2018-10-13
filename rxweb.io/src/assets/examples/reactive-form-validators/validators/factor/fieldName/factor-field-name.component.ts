import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-factor-fieldName-validator',
    templateUrl: './factor-field-name.component.html'
})
export class FactorFieldNameValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.formGroup({
																thirdNumber:['',RxwebValidators.factor({fieldName:"firstNumber"  ,conditionalExpression:x => x.firstNumber == 25 })], 
													secondNumber:['',RxwebValidators.factor({fieldName:"firstNumber"  ,conditionalExpression:(x,y) =>{ return  x.firstNumber == 25 } })], 
								});
    }
}

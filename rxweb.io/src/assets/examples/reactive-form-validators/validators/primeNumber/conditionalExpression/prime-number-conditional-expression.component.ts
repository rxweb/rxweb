import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-primeNumber-conditionalExpression-validator',
    templateUrl: './prime-number-conditional-expression.component.html'
})
export class PrimeNumberConditionalExpressionValidatorComponent implements OnInit {
    numberInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.numberInfoFormGroup = this.formBuilder.group({
										numberType:['',], 
													thirdNumber:['', RxwebValidators.primeNumber({conditionalExpression:'x => x.numberType =="Prime"' })], 
													secondNumber:['', RxwebValidators.primeNumber({conditionalExpression:(x,y) => x.numberType == "Prime"  })], 
								});
    }
}

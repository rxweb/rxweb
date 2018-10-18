import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { NumberInfo } from './number-info.model';

@Component({
    selector: 'app-primeNumber-conditionalExpression',
    templateUrl: './prime-number-conditional-expression.component.html'
})
export class PrimeNumberConditionalExpressionComponent implements OnInit {

    numberInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let numberInfo = new NumberInfo();
        this.numberInfoFormGroup = this.formBuilder.formGroup(numberInfo);
    }
}

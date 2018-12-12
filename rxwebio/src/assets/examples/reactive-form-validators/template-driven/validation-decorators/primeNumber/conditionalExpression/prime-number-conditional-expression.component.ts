import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { NumberInfo } from './number-info.model';

@Component({
    selector: 'app-primeNumber-conditionalExpression-template-driven-validation-decorators',
    templateUrl: './prime-number-conditional-expression.component.html'
})
export class PrimeNumberConditionalExpressionTemplateDrivenValidationDecoratorsComponent implements OnInit {
    numberinfo: NumberInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.numberinfo= new NumberInfo()
    }
}

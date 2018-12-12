import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { ResultInfo } from './result-info.model';

@Component({
    selector: 'app-minNumber-conditionalExpression-template-driven-validation-directives',
    templateUrl: './min-number-conditional-expression.component.html'
})
export class MinNumberConditionalExpressionTemplateDrivenValidationDirectivesComponent implements OnInit {
    resultinfo: ResultInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.resultinfo= new ResultInfo()
    }
}

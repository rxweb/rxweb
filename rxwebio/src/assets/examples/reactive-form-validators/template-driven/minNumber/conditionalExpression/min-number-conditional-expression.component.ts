import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { ResultInfo } from './result-info.model';

@Component({
    selector: 'app-minNumber-conditionalExpression-template-driven',
    templateUrl: './min-number-conditional-expression.component.html'
})
export class MinNumberConditionalExpressionTemplateDrivenComponent implements OnInit {
    resultinfo: ResultInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.resultinfo= new ResultInfo()
    }
}

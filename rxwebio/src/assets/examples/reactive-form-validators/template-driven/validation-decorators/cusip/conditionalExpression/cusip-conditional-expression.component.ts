import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { CompanyInfo } from './company-info.model';

@Component({
    selector: 'app-cusip-conditionalExpression-template-driven-validation-decorators',
    templateUrl: './cusip-conditional-expression.component.html'
})
export class CusipConditionalExpressionTemplateDrivenValidationDecoratorsComponent implements OnInit {
    companyinfo: CompanyInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.companyinfo= new CompanyInfo()
    }
}

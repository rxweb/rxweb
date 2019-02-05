import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { CompanyInfo } from './company-info.model';

@Component({
    selector: 'app-cusip-conditionalExpression-template-driven-validation-directives',
    templateUrl: './cusip-conditional-expression.component.html'
})
export class CusipConditionalExpressionTemplateDrivenValidationDirectivesComponent implements OnInit {
    companyinfo: CompanyInfo
					companyNames = [ "Google", "Microsoft",];

    constructor(
    ) { }

    ngOnInit() {
       this.companyinfo= new CompanyInfo()
    }
}

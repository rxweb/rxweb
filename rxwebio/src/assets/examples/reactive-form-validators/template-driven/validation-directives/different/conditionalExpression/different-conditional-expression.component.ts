import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { AccountInfo } from './account-info.model';

@Component({
    selector: 'app-different-conditionalExpression-template-driven-validation-directives',
    templateUrl: './different-conditional-expression.component.html'
})
export class DifferentConditionalExpressionTemplateDrivenValidationDirectivesComponent implements OnInit {
    accountinfo: AccountInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.accountinfo= new AccountInfo()
    }
}

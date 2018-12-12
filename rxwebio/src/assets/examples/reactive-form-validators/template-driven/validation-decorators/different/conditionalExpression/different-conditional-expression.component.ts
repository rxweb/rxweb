import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { AccountInfo } from './account-info.model';

@Component({
    selector: 'app-different-conditionalExpression-template-driven-validation-decorators',
    templateUrl: './different-conditional-expression.component.html'
})
export class DifferentConditionalExpressionTemplateDrivenValidationDecoratorsComponent implements OnInit {
    accountinfo: AccountInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.accountinfo= new AccountInfo()
    }
}

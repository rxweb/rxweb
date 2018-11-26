import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { UserInfo } from './user-info.model';

@Component({
    selector: 'app-numeric-conditionalExpression-template-driven',
    templateUrl: './numeric-conditional-expression.component.html'
})
export class NumericConditionalExpressionTemplateDrivenComponent implements OnInit {
    userinfo: UserInfo

    constructor(
    ) { }

    ngOnInit() {
       this.userinfo= new UserInfo()
    }
}

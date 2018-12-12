import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { UserInfo } from './user-info.model';

@Component({
    selector: 'app-extension-conditionalExpression-template-driven-validation-decorators',
    templateUrl: './extension-conditional-expression.component.html'
})
export class ExtensionConditionalExpressionTemplateDrivenValidationDecoratorsComponent implements OnInit {
    userinfo: UserInfo
					fileTypes = [ "Picture", "Document",];

    constructor(
    ) { }

    ngOnInit() {
       this.userinfo= new UserInfo()
    }
}

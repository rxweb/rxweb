import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { UserInfo } from './user-info.model';

@Component({
    selector: 'app-file-conditionalExpression-template-driven-validation-decorators',
    templateUrl: './file-conditional-expression.component.html'
})
export class FileConditionalExpressionTemplateDrivenValidationDecoratorsComponent implements OnInit {
    userinfo: UserInfo
					fileTypes = [ "Picture", "Document",];

    constructor(
    ) { }

    ngOnInit() {
       this.userinfo= new UserInfo()
    }
}

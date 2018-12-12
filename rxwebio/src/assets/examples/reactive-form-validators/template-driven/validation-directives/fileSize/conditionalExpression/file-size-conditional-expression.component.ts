import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { UserInfo } from './user-info.model';

@Component({
    selector: 'app-fileSize-conditionalExpression-template-driven-validation-directives',
    templateUrl: './file-size-conditional-expression.component.html'
})
export class FileSizeConditionalExpressionTemplateDrivenValidationDirectivesComponent implements OnInit {
    userinfo: UserInfo
					fileTypes = [ "Picture", "Document",];

    constructor(
    ) { }

    ngOnInit() {
       this.userinfo= new UserInfo()
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-ascii-conditionalExpression-template-driven-validation-decorators',
    templateUrl: './ascii-conditional-expression.component.html'
})
export class AsciiConditionalExpressionTemplateDrivenValidationDecoratorsComponent implements OnInit {
    user: User
	
    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}

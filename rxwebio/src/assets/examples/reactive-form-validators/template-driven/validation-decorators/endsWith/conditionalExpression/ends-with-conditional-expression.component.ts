import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-endsWith-conditionalExpression-template-driven-validation-decorators',
    templateUrl: './ends-with-conditional-expression.component.html'
})
export class EndsWithConditionalExpressionTemplateDrivenValidationDecoratorsComponent implements OnInit {
    user: User
	
    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}

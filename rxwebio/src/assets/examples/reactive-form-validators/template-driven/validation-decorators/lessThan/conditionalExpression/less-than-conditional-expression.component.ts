import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-lessThan-conditionalExpression-template-driven-validation-decorators',
    templateUrl: './less-than-conditional-expression.component.html'
})
export class LessThanConditionalExpressionTemplateDrivenValidationDecoratorsComponent implements OnInit {
    user: User
	
    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}

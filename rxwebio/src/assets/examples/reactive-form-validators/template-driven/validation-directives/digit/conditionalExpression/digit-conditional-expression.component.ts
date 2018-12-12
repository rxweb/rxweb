import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-digit-conditionalExpression-template-driven-validation-directives',
    templateUrl: './digit-conditional-expression.component.html'
})
export class DigitConditionalExpressionTemplateDrivenValidationDirectivesComponent implements OnInit {
    user: User
	
    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}

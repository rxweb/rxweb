import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-creditCard-conditionalExpression-template-driven-validation-directives',
    templateUrl: './credit-card-conditional-expression.component.html'
})
export class CreditCardConditionalExpressionTemplateDrivenValidationDirectivesComponent implements OnInit {
    user: User
					creditCardTypes = [ "Visa", "AmericanExpress", "Maestro", "JCB", "Discover", "DinersClub", "MasterCard",];

    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}

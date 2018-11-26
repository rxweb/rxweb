import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-creditCard-conditionalExpression-template-driven',
    templateUrl: './credit-card-conditional-expression.component.html'
})
export class CreditCardConditionalExpressionTemplateDrivenComponent implements OnInit {
    user: User

    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}

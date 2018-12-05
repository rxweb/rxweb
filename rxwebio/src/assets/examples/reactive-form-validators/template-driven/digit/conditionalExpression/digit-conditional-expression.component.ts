import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-digit-conditionalExpression-template-driven',
    templateUrl: './digit-conditional-expression.component.html'
})
export class DigitConditionalExpressionTemplateDrivenComponent implements OnInit {
    user: User
	
    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}

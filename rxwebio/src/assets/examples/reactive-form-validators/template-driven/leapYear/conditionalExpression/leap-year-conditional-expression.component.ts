import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-leapYear-conditionalExpression-template-driven',
    templateUrl: './leap-year-conditional-expression.component.html'
})
export class LeapYearConditionalExpressionTemplateDrivenComponent implements OnInit {
    user: User
	
    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-minDate-conditionalExpression-template-driven',
    templateUrl: './min-date-conditional-expression.component.html'
})
export class MinDateConditionalExpressionTemplateDrivenComponent implements OnInit {
    user: User
	
    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}

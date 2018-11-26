import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-pattern-conditionalExpression-template-driven',
    templateUrl: './pattern-conditional-expression.component.html'
})
export class PatternConditionalExpressionTemplateDrivenComponent implements OnInit {
    user: User

    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}

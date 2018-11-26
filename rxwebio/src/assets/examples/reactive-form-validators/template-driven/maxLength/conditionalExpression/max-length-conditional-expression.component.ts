import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-maxLength-conditionalExpression-template-driven',
    templateUrl: './max-length-conditional-expression.component.html'
})
export class MaxLengthConditionalExpressionTemplateDrivenComponent implements OnInit {
    user: User

    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-leapYear-message-template-driven-validation-decorators',
    templateUrl: './leap-year-message.component.html'
})
export class LeapYearMessageTemplateDrivenValidationDecoratorsComponent implements OnInit {
    user: User
	
    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}

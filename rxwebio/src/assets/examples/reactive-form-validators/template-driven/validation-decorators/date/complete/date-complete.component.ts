import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { UserInfo } from './user-info.model';

@Component({
    selector: 'app-date-complete-template-driven-validation-decorators',
    templateUrl: './date-complete.component.html'
})
export class DateCompleteTemplateDrivenValidationDecoratorsComponent implements OnInit {
    userinfo: UserInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.userinfo= new UserInfo()
    }
}

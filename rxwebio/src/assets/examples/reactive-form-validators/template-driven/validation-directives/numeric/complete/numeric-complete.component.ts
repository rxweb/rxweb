import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { UserInfo } from './user-info.model';

@Component({
    selector: 'app-numeric-complete-template-driven-validation-directives',
    templateUrl: './numeric-complete.component.html'
})
export class NumericCompleteTemplateDrivenValidationDirectivesComponent implements OnInit {
    userinfo: UserInfo
					dataTypes = [ "Real", "Integer",];

    constructor(
    ) { }

    ngOnInit() {
       this.userinfo= new UserInfo()
    }
}

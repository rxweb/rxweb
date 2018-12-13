import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { LoginInfo } from './login-info.model';

@Component({
    selector: 'app-password-add-template-driven-validation-directives',
    templateUrl: './password-add.component.html'
})
export class PasswordAddTemplateDrivenValidationDirectivesComponent implements OnInit {
    logininfo: LoginInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.logininfo= new LoginInfo()
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { LoginInfo } from './login-info.model';

@Component({
    selector: 'app-password-message-template-driven-validation-directives',
    templateUrl: './password-message.component.html'
})
export class PasswordMessageTemplateDrivenValidationDirectivesComponent implements OnInit {
    logininfo: LoginInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.logininfo= new LoginInfo()
    }
}

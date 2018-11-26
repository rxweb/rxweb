import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { LoginInfo } from './login-info.model';

@Component({
    selector: 'app-password-complete-template-driven',
    templateUrl: './password-complete.component.html'
})
export class PasswordCompleteTemplateDrivenComponent implements OnInit {
    logininfo: LoginInfo

    constructor(
    ) { }

    ngOnInit() {
       this.logininfo= new LoginInfo()
    }
}

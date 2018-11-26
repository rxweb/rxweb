import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { LoginInfo } from './login-info.model';

@Component({
    selector: 'app-password-add-template-driven',
    templateUrl: './password-add.component.html'
})
export class PasswordAddTemplateDrivenComponent implements OnInit {
    logininfo: LoginInfo

    constructor(
    ) { }

    ngOnInit() {
       this.logininfo= new LoginInfo()
    }
}

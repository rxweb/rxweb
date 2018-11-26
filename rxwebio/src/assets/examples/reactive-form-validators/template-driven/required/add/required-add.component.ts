import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { UserInfo } from './user-info.model';

@Component({
    selector: 'app-required-add-template-driven',
    templateUrl: './required-add.component.html'
})
export class RequiredAddTemplateDrivenComponent implements OnInit {
    userinfo: UserInfo

    constructor(
    ) { }

    ngOnInit() {
       this.userinfo= new UserInfo()
    }
}

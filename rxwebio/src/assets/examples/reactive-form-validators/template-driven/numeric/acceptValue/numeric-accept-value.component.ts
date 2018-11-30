import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { UserInfo } from './user-info.model';

@Component({
    selector: 'app-numeric-acceptValue-template-driven',
    templateUrl: './numeric-accept-value.component.html'
})
export class NumericAcceptValueTemplateDrivenComponent implements OnInit {
    userinfo: UserInfo

    constructor(
    ) { }

    ngOnInit() {
       this.userinfo= new UserInfo()
    }
}

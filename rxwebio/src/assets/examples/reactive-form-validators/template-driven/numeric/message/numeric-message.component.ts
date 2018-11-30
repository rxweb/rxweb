import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { UserInfo } from './user-info.model';

@Component({
    selector: 'app-numeric-message-template-driven',
    templateUrl: './numeric-message.component.html'
})
export class NumericMessageTemplateDrivenComponent implements OnInit {
    userinfo: UserInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.userinfo= new UserInfo()
    }
}

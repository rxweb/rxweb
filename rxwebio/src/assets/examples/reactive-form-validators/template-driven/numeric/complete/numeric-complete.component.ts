import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { UserInfo } from './user-info.model';

@Component({
    selector: 'app-numeric-complete-template-driven',
    templateUrl: './numeric-complete.component.html'
})
export class NumericCompleteTemplateDrivenComponent implements OnInit {
    userinfo: UserInfo
					dataTypes = [ "Real", "Positive",];

    constructor(
    ) { }

    ngOnInit() {
       this.userinfo= new UserInfo()
    }
}

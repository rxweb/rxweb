import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { AccountInfo } from './account-info.model';

@Component({
    selector: 'app-different-message-template-driven',
    templateUrl: './different-message.component.html'
})
export class DifferentMessageTemplateDrivenComponent implements OnInit {
    accountinfo: AccountInfo

    constructor(
    ) { }

    ngOnInit() {
       this.accountinfo= new AccountInfo()
    }
}

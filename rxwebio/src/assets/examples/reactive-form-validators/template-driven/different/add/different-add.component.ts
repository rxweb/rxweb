import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { AccountInfo } from './account-info.model';

@Component({
    selector: 'app-different-add-template-driven',
    templateUrl: './different-add.component.html'
})
export class DifferentAddTemplateDrivenComponent implements OnInit {
    accountinfo: AccountInfo

    constructor(
    ) { }

    ngOnInit() {
       this.accountinfo= new AccountInfo()
    }
}

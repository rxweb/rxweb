import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { AccountInfo } from './account-info.model';

@Component({
    selector: 'app-different-complete-template-driven-validation-decorators',
    templateUrl: './different-complete.component.html'
})
export class DifferentCompleteTemplateDrivenValidationDecoratorsComponent implements OnInit {
    accountinfo: AccountInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.accountinfo= new AccountInfo()
    }
}

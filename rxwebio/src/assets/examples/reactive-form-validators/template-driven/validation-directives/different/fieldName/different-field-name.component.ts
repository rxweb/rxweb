import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { AccountInfo } from './account-info.model';

@Component({
    selector: 'app-different-fieldName-template-driven-validation-directives',
    templateUrl: './different-field-name.component.html'
})
export class DifferentFieldNameTemplateDrivenValidationDirectivesComponent implements OnInit {
    accountinfo: AccountInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.accountinfo= new AccountInfo()
    }
}

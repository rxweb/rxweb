import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { CompanyInfo } from './company-info.model';

@Component({
    selector: 'app-cusip-message-template-driven-validation-directives',
    templateUrl: './cusip-message.component.html'
})
export class CusipMessageTemplateDrivenValidationDirectivesComponent implements OnInit {
    companyinfo: CompanyInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.companyinfo= new CompanyInfo()
    }
}

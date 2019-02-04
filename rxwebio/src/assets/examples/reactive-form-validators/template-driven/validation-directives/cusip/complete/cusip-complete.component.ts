import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { CompanyInfo } from './company-info.model';

@Component({
    selector: 'app-cusip-complete-template-driven-validation-directives',
    templateUrl: './cusip-complete.component.html'
})
export class CusipCompleteTemplateDrivenValidationDirectivesComponent implements OnInit {
    companyinfo: CompanyInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.companyinfo= new CompanyInfo()
    }
}

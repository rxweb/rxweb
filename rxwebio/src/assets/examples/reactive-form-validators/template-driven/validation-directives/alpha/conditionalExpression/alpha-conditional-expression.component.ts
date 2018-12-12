import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { AddressInfo } from './address-info.model';

@Component({
    selector: 'app-alpha-conditionalExpression-template-driven-validation-directives',
    templateUrl: './alpha-conditional-expression.component.html'
})
export class AlphaConditionalExpressionTemplateDrivenValidationDirectivesComponent implements OnInit {
    addressinfo: AddressInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.addressinfo= new AddressInfo()
    }
}

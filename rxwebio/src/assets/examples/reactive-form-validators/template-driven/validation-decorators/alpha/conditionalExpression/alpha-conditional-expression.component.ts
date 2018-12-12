import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { AddressInfo } from './address-info.model';

@Component({
    selector: 'app-alpha-conditionalExpression-template-driven-validation-decorators',
    templateUrl: './alpha-conditional-expression.component.html'
})
export class AlphaConditionalExpressionTemplateDrivenValidationDecoratorsComponent implements OnInit {
    addressinfo: AddressInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.addressinfo= new AddressInfo()
    }
}

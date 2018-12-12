import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { MacAddressInfo } from './mac-address-info.model';

@Component({
    selector: 'app-mac-conditionalExpression-template-driven-validation-directives',
    templateUrl: './mac-conditional-expression.component.html'
})
export class MacConditionalExpressionTemplateDrivenValidationDirectivesComponent implements OnInit {
    macaddressinfo: MacAddressInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.macaddressinfo= new MacAddressInfo()
    }
}

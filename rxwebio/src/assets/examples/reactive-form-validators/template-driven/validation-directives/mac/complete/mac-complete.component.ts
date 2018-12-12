import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { MacAddressInfo } from './mac-address-info.model';

@Component({
    selector: 'app-mac-complete-template-driven-validation-directives',
    templateUrl: './mac-complete.component.html'
})
export class MacCompleteTemplateDrivenValidationDirectivesComponent implements OnInit {
    macaddressinfo: MacAddressInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.macaddressinfo= new MacAddressInfo()
    }
}

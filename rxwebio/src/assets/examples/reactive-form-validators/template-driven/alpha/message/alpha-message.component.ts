import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { AddressInfo } from './address-info.model';

@Component({
    selector: 'app-alpha-message-template-driven',
    templateUrl: './alpha-message.component.html'
})
export class AlphaMessageTemplateDrivenComponent implements OnInit {
    addressinfo: AddressInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.addressinfo= new AddressInfo()
    }
}

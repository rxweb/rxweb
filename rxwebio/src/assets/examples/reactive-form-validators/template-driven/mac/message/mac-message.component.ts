import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { MacAddressInfo } from './mac-address-info.model';

@Component({
    selector: 'app-mac-message-template-driven',
    templateUrl: './mac-message.component.html'
})
export class MacMessageTemplateDrivenComponent implements OnInit {
    macaddressinfo: MacAddressInfo

    constructor(
    ) { }

    ngOnInit() {
       this.macaddressinfo= new MacAddressInfo()
    }
}

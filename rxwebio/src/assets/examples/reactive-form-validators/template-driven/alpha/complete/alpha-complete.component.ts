import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { AddressInfo } from './address-info.model';

@Component({
    selector: 'app-alpha-complete-template-driven',
    templateUrl: './alpha-complete.component.html'
})
export class AlphaCompleteTemplateDrivenComponent implements OnInit {
    addressinfo: AddressInfo

    constructor(
    ) { }

    ngOnInit() {
       this.addressinfo= new AddressInfo()
    }
}

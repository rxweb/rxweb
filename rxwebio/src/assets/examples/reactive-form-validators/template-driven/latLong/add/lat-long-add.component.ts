import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Country } from './country.model';

@Component({
    selector: 'app-latLong-add-template-driven',
    templateUrl: './lat-long-add.component.html'
})
export class LatLongAddTemplateDrivenComponent implements OnInit {
    country: Country

    constructor(
    ) { }

    ngOnInit() {
       this.country= new Country()
    }
}

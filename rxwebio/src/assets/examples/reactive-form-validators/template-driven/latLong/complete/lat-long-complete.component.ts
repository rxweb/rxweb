import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Country } from './country.model';

@Component({
    selector: 'app-latLong-complete-template-driven',
    templateUrl: './lat-long-complete.component.html'
})
export class LatLongCompleteTemplateDrivenComponent implements OnInit {
    country: Country
	
    constructor(
    ) { }

    ngOnInit() {
       this.country= new Country()
    }
}

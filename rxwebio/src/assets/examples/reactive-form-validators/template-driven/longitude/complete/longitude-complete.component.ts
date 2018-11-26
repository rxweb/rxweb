import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Country } from './country.model';

@Component({
    selector: 'app-longitude-complete-template-driven',
    templateUrl: './longitude-complete.component.html'
})
export class LongitudeCompleteTemplateDrivenComponent implements OnInit {
    country: Country

    constructor(
    ) { }

    ngOnInit() {
       this.country= new Country()
    }
}

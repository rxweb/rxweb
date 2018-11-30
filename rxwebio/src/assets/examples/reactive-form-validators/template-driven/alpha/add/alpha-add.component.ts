import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Country } from './country.model';

@Component({
    selector: 'app-alpha-add-template-driven',
    templateUrl: './alpha-add.component.html'
})
export class AlphaAddTemplateDrivenComponent implements OnInit {
    country: Country

    constructor(
    ) { }

    ngOnInit() {
       this.country= new Country()
    }
}

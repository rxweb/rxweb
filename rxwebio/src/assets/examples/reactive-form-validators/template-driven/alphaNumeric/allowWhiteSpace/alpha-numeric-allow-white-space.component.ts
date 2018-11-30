import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Location } from './location.model';

@Component({
    selector: 'app-alphaNumeric-allowWhiteSpace-template-driven',
    templateUrl: './alpha-numeric-allow-white-space.component.html'
})
export class AlphaNumericAllowWhiteSpaceTemplateDrivenComponent implements OnInit {
    location: Location

    constructor(
    ) { }

    ngOnInit() {
       this.location= new Location()
    }
}

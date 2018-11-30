import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Location } from './location.model';

@Component({
    selector: 'app-alphaNumeric-message-template-driven',
    templateUrl: './alpha-numeric-message.component.html'
})
export class AlphaNumericMessageTemplateDrivenComponent implements OnInit {
    location: Location

    constructor(
    ) { }

    ngOnInit() {
       this.location= new Location()
    }
}

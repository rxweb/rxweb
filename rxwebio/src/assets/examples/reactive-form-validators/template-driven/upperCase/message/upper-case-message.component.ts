import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Location } from './location.model';

@Component({
    selector: 'app-upperCase-message-template-driven',
    templateUrl: './upper-case-message.component.html'
})
export class UpperCaseMessageTemplateDrivenComponent implements OnInit {
    location: Location

    constructor(
    ) { }

    ngOnInit() {
       this.location= new Location()
    }
}

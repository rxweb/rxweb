import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Location } from './location.model';

@Component({
    selector: 'app-upperCase-complete-template-driven',
    templateUrl: './upper-case-complete.component.html'
})
export class UpperCaseCompleteTemplateDrivenComponent implements OnInit {
    location: Location

    constructor(
    ) { }

    ngOnInit() {
       this.location= new Location()
    }
}

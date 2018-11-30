import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Location } from './location.model';

@Component({
    selector: 'app-maxLength-add-template-driven',
    templateUrl: './max-length-add.component.html'
})
export class MaxLengthAddTemplateDrivenComponent implements OnInit {
    location: Location
	
    constructor(
    ) { }

    ngOnInit() {
       this.location= new Location()
    }
}

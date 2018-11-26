import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-maxDate-value-template-driven',
    templateUrl: './max-date-value.component.html'
})
export class MaxDateValueTemplateDrivenComponent implements OnInit {
    user: User

    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}

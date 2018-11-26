import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-greaterThanEqualTo-complete-template-driven',
    templateUrl: './greater-than-equal-to-complete.component.html'
})
export class GreaterThanEqualToCompleteTemplateDrivenComponent implements OnInit {
    user: User

    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}

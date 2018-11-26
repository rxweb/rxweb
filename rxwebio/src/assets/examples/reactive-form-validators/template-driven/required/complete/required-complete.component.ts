import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-required-complete-template-driven',
    templateUrl: './required-complete.component.html'
})
export class RequiredCompleteTemplateDrivenComponent implements OnInit {
    user: User

    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}

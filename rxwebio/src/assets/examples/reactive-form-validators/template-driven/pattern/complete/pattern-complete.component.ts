import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-pattern-complete-template-driven',
    templateUrl: './pattern-complete.component.html'
})
export class PatternCompleteTemplateDrivenComponent implements OnInit {
    user: User

    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}

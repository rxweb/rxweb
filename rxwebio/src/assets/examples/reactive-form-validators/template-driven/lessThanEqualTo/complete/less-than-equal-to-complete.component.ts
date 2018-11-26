import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-lessThanEqualTo-complete-template-driven',
    templateUrl: './less-than-equal-to-complete.component.html'
})
export class LessThanEqualToCompleteTemplateDrivenComponent implements OnInit {
    user: User

    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}

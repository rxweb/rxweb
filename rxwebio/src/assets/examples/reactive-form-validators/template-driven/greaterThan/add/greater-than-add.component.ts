import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-greaterThan-add-template-driven',
    templateUrl: './greater-than-add.component.html'
})
export class GreaterThanAddTemplateDrivenComponent implements OnInit {
    user: User
	
    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}

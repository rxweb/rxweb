import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-greaterThanEqualTo-fieldName-template-driven',
    templateUrl: './greater-than-equal-to-field-name.component.html'
})
export class GreaterThanEqualToFieldNameTemplateDrivenComponent implements OnInit {
    user: User

    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}

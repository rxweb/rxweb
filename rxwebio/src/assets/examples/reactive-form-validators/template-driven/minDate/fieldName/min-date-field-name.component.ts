import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-minDate-fieldName-template-driven',
    templateUrl: './min-date-field-name.component.html'
})
export class MinDateFieldNameTemplateDrivenComponent implements OnInit {
    user: User
	
    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}

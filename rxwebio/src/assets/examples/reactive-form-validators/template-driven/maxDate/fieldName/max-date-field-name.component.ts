import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-maxDate-fieldName-template-driven',
    templateUrl: './max-date-field-name.component.html'
})
export class MaxDateFieldNameTemplateDrivenComponent implements OnInit {
    user: User
	
    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}

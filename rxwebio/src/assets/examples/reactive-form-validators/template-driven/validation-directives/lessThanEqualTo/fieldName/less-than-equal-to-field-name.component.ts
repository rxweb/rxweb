import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-lessThanEqualTo-fieldName-template-driven-validation-directives',
    templateUrl: './less-than-equal-to-field-name.component.html'
})
export class LessThanEqualToFieldNameTemplateDrivenValidationDirectivesComponent implements OnInit {
    user: User
	
    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-port-complete-template-driven-validation-directives',
    templateUrl: './port-complete.component.html'
})
export class PortCompleteTemplateDrivenValidationDirectivesComponent implements OnInit {
    user: User
	
    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}

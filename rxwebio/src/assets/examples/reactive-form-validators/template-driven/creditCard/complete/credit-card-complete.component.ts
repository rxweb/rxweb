import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-creditCard-complete-template-driven',
    templateUrl: './credit-card-complete.component.html'
})
export class CreditCardCompleteTemplateDrivenComponent implements OnInit {
    user: User
					creditCardTypes = [ "Visa", "AmericanExpress", "Maestro", "JCB", "Discover", "DinersClub", "MasterCard",];

    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { User } from './user.model';

@Component({
    selector: 'app-creditCard-add-template-driven',
    templateUrl: './credit-card-add.component.html'
})
export class CreditCardAddTemplateDrivenComponent implements OnInit {
    user: User
					creditCardTypes = [ "Visa", "AmericanExpress", "Maestro", "JCB", "Discover", "DinersClub", "MasterCard",];

    constructor(
    ) { }

    ngOnInit() {
       this.user= new User()
    }
}

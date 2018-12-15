import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { Contact } from './contact.model';

@Component({
    selector: 'app-minLength-conditionalExpression-template-driven-validation-decorators',
    templateUrl: './min-length-conditional-expression.component.html'
})
export class MinLengthConditionalExpressionTemplateDrivenValidationDecoratorsComponent implements OnInit {
    contact: Contact
	
    constructor(
    ) { }

    ngOnInit() {
       this.contact= new Contact()
    }
}

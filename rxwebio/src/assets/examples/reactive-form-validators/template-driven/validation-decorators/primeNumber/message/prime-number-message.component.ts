import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { NumberInfo } from './number-info.model';

@Component({
    selector: 'app-primeNumber-message-template-driven-validation-decorators',
    templateUrl: './prime-number-message.component.html'
})
export class PrimeNumberMessageTemplateDrivenValidationDecoratorsComponent implements OnInit {
    numberinfo: NumberInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.numberinfo= new NumberInfo()
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { NumberInfo } from './number-info.model';

@Component({
    selector: 'app-primeNumber-complete-template-driven-validation-decorators',
    templateUrl: './prime-number-complete.component.html'
})
export class PrimeNumberCompleteTemplateDrivenValidationDecoratorsComponent implements OnInit {
    numberinfo: NumberInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.numberinfo= new NumberInfo()
    }
}

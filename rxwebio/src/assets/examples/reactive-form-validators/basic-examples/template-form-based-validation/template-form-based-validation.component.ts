import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"

import { RxFormBuilder,FormBuilderConfiguration,RxwebValidators } from '@rxweb/reactive-form-validators';

import { Country } from './template-form-based-validation.model'

@Component({
    selector: 'app-template-form-based-validation',
    templateUrl: './template-form-based-validation.component.html'
})
export class TemplateFormBasedValidationComponent implements OnInit {
    country:Country

    constructor() { }

    ngOnInit() {
        this.country = new Country();
    }
}

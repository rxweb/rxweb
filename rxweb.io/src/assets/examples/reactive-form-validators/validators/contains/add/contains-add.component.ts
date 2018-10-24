import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-contains-add-validator',
    templateUrl: './contains-add.component.html'
})
export class ContainsAddValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            emailAddress:['', RxwebValidators.contains({value:'@gmail.com' })], 
        });
    }
}

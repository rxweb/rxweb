import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-pattern-message-validator',
    templateUrl: './pattern-message.component.html'
})
export class PatternMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            zipCode:['', RxwebValidators.pattern({expression:{'zipCode':/^[0-9]{5}(?:-[0-9]{4})?$/ }  ,message:'Zip code should match 12345 or 12345-6789' })], 
        });
    }
}

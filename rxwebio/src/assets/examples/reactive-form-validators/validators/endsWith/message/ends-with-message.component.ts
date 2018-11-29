import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-endsWith-message-validator',
    templateUrl: './ends-with-message.component.html'
})
export class EndsWithMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            name:['', RxwebValidators.endsWith({value:'t'  ,message:'{{0}} does not ends with `t`' })], 
        });
    }
}

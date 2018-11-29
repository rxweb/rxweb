import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-ascii-message-validator',
    templateUrl: './ascii-message.component.html'
})
export class AsciiMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            specialCharAsciiCode:['', RxwebValidators.ascii({message:'{{0}} is not an Ascii Code' })], 
        });
    }
}

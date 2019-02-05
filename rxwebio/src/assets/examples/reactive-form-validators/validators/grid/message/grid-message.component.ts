import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-grid-message-validator',
    templateUrl: './grid-message.component.html'
})
export class GridMessageValidatorComponent implements OnInit {
    digitalInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.digitalInfoFormGroup = this.formBuilder.group({
            graphicImageGrid:['', RxwebValidators.grid({message:'This is Not valid GRid' })], 
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-grid-add-validator',
    templateUrl: './grid-add.component.html'
})
export class GridAddValidatorComponent implements OnInit {
    digitalInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.digitalInfoFormGroup = this.formBuilder.group({
            soundRecordingGrid:['', RxwebValidators.grid()], 
        });
    }
}

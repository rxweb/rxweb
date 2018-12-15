import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-range-minimumNumber-validator',
    templateUrl: './range-minimum-number.component.html'
})
export class RangeMinimumNumberValidatorComponent implements OnInit {
    employeeInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.employeeInfoFormGroup = this.formBuilder.group({
            age:['', RxwebValidators.range({minimumNumber:18  ,maximumNumber:60 })], 
        });
    }
}

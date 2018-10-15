import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-range-add-validator',
    templateUrl: './range-add.component.html'
})
export class RangeAddValidatorComponent implements OnInit {
    employeeInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.employeeInfoFormGroup = this.formBuilder.group({
										age:['', RxwebValidators.range({minimumNumber:18  ,maximumNumber:60 })], 
								});
    }
}

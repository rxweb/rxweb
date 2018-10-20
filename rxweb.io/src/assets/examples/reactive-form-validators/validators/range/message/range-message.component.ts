import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-range-message-validator',
    templateUrl: './range-message.component.html'
})
export class RangeMessageValidatorComponent implements OnInit {
    employeeInfoFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.employeeInfoFormGroup = this.formBuilder.group({
										salary:['', RxwebValidators.range({minimumNumber:1000  ,maximumNumber:200000  ,message:'Your Salary should be between 10000 to 200000.' })], 
								});
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-maxLength-add-validator',
    templateUrl: './max-length-add.component.html'
})
export class MaxLengthAddValidatorComponent implements OnInit {
    locationFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.locationFormGroup = this.formBuilder.formGroup({
										firstName:['',RxwebValidators.maxLength({value:10 })], 
								});
    }
}

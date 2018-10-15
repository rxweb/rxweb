import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-compare-fieldName-validator',
    templateUrl: './compare-field-name.component.html'
})
export class CompareFieldNameValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										password:['',], 
													confirmPassword:['', RxwebValidators.compare({fieldName:'password'  ,message:'Both Input is not matched' })], 
								});
    }
}

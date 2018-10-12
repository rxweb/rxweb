import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minLength-value-validator',
    templateUrl: './min-length-value.component.html'
})
export class MinLengthValueValidatorComponent implements OnInit {
    contactFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.contactFormGroup = this.formBuilder.formGroup({
																stateCode:['',RxwebValidators.minLength({value:3  ,conditionalExpression:x => x.countryName == "India" })], 
													countryCode:['',RxwebValidators.minLength({value:3  ,conditionalExpression:(x,y)=>{ return x.countryName == "India"} })], 
								});
    }
}

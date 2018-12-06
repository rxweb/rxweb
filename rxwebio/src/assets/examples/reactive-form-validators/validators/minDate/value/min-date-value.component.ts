import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minDate-value-validator',
    templateUrl: './min-date-value.component.html'
})
export class MinDateValueValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            admissionDate:['', RxwebValidators.minDate({value:new Date(2018,7,30)  ,conditionalExpression:'x => x.userName == "Bharat"' })], 
            birthDate:['', RxwebValidators.minDate({value:new Date(2018,7,30)  ,conditionalExpression:(x,y) => x.userName == "Bharat"  })], 
        });
    }
}

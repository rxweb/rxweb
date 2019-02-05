import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-date-complete-validator',
    templateUrl: './date-complete.component.html'
})
export class DateCompleteValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            birthDate:['', RxwebValidators.date()], 
            admissionDate:['', RxwebValidators.date({conditionalExpression:(x,y) => x.birthDate == "16/04/1997"  })], 
            enrollmentDate:['', RxwebValidators.date({conditionalExpression:'x => x.birthDate =="16/04/1997"' })], 
            allocationDate:['', RxwebValidators.date({message:'{{0}} is not a valid date' })], 
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-maxDate-complete-validator',
    templateUrl: './max-date-complete.component.html'
})
export class MaxDateCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            userName:['',], 
            allocationDate:['', RxwebValidators.maxDate({value:'07/30/2018' })], 
            birthDate:['', RxwebValidators.maxDate({value:'07/30/2018'  ,conditionalExpression:(x,y) => x.userName == "Bharat"  })], 
            admissionDate:['', RxwebValidators.maxDate({value:'07/30/2018'  ,conditionalExpression:'x => x.userName == "Bharat"' })], 
            registrationDate:['', RxwebValidators.maxDate({value:'07/30/2018'  ,message:'{{0}} exceeds the Maximum Date Limit' })], 
            enrollmentDate:['',], 
            lastRegistrationDate:['', RxwebValidators.maxDate({fieldName:'enrollmentDate' })], 
        });
    }
}

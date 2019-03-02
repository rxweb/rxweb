import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-minDate-complete-validator',
    templateUrl: './min-date-complete.component.html'
})
export class MinDateCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            userName:['',], 
            allocationDate:['', RxwebValidators.minDate({value:'07/30/2018' })], 
            birthDate:['', RxwebValidators.minDate({value:'07/30/2018'  ,conditionalExpression:(x,y) => x.userName == "Bharat"  })], 
            admissionDate:['', RxwebValidators.minDate({value:'07/30/2018'  ,conditionalExpression:'x => x.userName == "Bharat"' })], 
            registrationDate:['', RxwebValidators.minDate({value:'07/30/2018'  ,message:'{{0}} exceeds the Minimum Date Limit' })], 
            enrollmentDate:['',], 
            lastRegistrationDate:['', RxwebValidators.minDate({fieldName:'enrollmentDate' })], 
            confirmationDate:['', RxwebValidators.minDate({value:'07/30/2018'  ,operator:'>' })], 
        });
    }
}

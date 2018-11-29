import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-range-complete-validator',
    templateUrl: './range-complete.component.html'
})
export class RangeCompleteValidatorComponent implements OnInit {
    employeeInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.employeeInfoFormGroup = this.formBuilder.group({
            age:['', RxwebValidators.range({minimumNumber:18  ,maximumNumber:60 })], 
            projectDuration:['', RxwebValidators.range({minimumNumber:6  ,maximumNumber:8  ,conditionalExpression:(x,y) => x.age >= 25  })], 
            experience:['', RxwebValidators.range({minimumNumber:2  ,maximumNumber:20  ,conditionalExpression:'x => x.age >=25' })], 
            salary:['', RxwebValidators.range({minimumNumber:1000  ,maximumNumber:200000  ,message:'Your Salary should be between 10000 to 200000.' })], 
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-greaterThanEqualTo-complete-validator',
    templateUrl: './greater-than-equal-to-complete.component.html'
})
export class GreaterThanEqualToCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            age:['',], 
            voterAge:['', RxwebValidators.greaterThanEqualTo({fieldName:'age'  ,conditionalExpression:(x,y) => x.age >= 18  })], 
            memberAge:['', RxwebValidators.greaterThanEqualTo({fieldName:'age'  ,conditionalExpression:'x => x.age >= 18 ' })], 
            otherAge:['', RxwebValidators.greaterThanEqualTo({fieldName:'age'  ,message:'Please enter number greater than or equal to 1.' })], 
        });
    }
}

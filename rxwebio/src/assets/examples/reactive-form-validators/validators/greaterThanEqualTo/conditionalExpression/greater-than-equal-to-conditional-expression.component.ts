import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-greaterThanEqualTo-conditionalExpression-validator',
    templateUrl: './greater-than-equal-to-conditional-expression.component.html'
})
export class GreaterThanEqualToConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            admissionAge:['',], 
            memberAge:['', RxwebValidators.greaterThanEqualTo({fieldName:'admissionAge'  ,conditionalExpression:'x => x.admissionAge >= 18 ' })], 
            voterAge:['', RxwebValidators.greaterThanEqualTo({fieldName:'admissionAge'  ,conditionalExpression:(x,y) => x.admissionAge >= 18  })], 
        });
    }
}

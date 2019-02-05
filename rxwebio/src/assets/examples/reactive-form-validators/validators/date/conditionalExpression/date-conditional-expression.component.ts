import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-date-conditionalExpression-validator',
    templateUrl: './date-conditional-expression.component.html'
})
export class DateConditionalExpressionValidatorComponent implements OnInit {
    userInfoFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userInfoFormGroup = this.formBuilder.group({
            birthDate:['', RxwebValidators.date()], 
            enrollmentDate:['', RxwebValidators.date({conditionalExpression:'x => x.birthDate =="16/04/1997"' })], 
            admissionDate:['', RxwebValidators.date({conditionalExpression:(x,y) => x.birthDate == "16/04/1997"  })], 
        });
    }
}

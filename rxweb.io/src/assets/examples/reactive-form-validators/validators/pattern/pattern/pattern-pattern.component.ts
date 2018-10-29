import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-pattern-pattern-validator',
    templateUrl: './pattern-pattern.component.html'
})
export class PatternPatternValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            contactNumber:['', RxwebValidators.pattern({pattern:{'onlyDigit': RegExp('/^[0-9]*$/')}  ,conditionalExpression:(x,y) => x.userName == "Bharat"  })], 
        });
    }
}

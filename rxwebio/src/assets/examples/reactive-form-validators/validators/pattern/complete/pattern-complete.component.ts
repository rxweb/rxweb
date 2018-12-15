import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-pattern-complete-validator',
    templateUrl: './pattern-complete.component.html'
})
export class PatternCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            userName:['', RxwebValidators.pattern({expression:{'onlyAlpha': RegExp('/^[A-Za-z]+$/')} })], 
            zipCode:['', RxwebValidators.pattern({expression:{'zipCode':RegExp('^[0-9]{5}(?:-[0-9]{4})?$') }  ,message:'Zip code should match 12345 or 12345-6789' })], 
            contactNumber:['', RxwebValidators.pattern({expression:{'onlyDigit': RegExp('/^[0-9]*$/')}  ,conditionalExpression:(x,y) => x.userName == "Bharat"  })], 
            age:['', RxwebValidators.pattern({expression:{'onlyDigit': RegExp('/^[0-9]*$new /')}  ,conditionalExpression:'x => x.userName=="Bharat"' })], 
        });
    }
}

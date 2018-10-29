import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-odd-complete-validator',
    templateUrl: './odd-complete.component.html'
})
export class OddCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder)
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            type:['',], 
            number:['', RxwebValidators.odd({conditionalExpression:(x,y) => x.type == "Odd"  })], 
            oddNumber:['', RxwebValidators.odd({conditionalExpression:'x => x.type == "Odd"' })], 
            multiplesOfOddNumber:['', RxwebValidators.odd({message:'{{0}} is not an odd number' })], 
        });
    }
}

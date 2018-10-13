import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-time-complete-validator',
    templateUrl: './time-complete.component.html'
})
export class TimeCompleteValidatorComponent implements OnInit {
    attandanceDetailFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.attandanceDetailFormGroup = this.formBuilder.formGroup({
																totalIn:['',RxwebValidators.time({conditionalExpression:(x,y) =>{ return  x.entryPlace == "Lunch Room" } })], 
													entryTime:['',RxwebValidators.time({conditionalExpression:x => x.entryPlace == "Lunch Room" })], 
													totalOutTime:['',RxwebValidators.time({allowSeconds:true })], 
													exitTime:['',RxwebValidators.time({message:'You can enter only time format data' })], 
								});
    }
}

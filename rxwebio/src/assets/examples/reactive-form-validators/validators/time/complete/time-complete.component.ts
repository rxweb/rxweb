import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-time-complete-validator',
    templateUrl: './time-complete.component.html'
})
export class TimeCompleteValidatorComponent implements OnInit {
    attandanceDetailFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.attandanceDetailFormGroup = this.formBuilder.group({
            entryPlace:['',], 
            totalIn:['', RxwebValidators.time({conditionalExpression:(x,y) => x.entryPlace == "Lunch Room"  })], 
            entryTime:['', RxwebValidators.time({conditionalExpression:'x => x.entryPlace == "Lunch Room"' })], 
            totalOutTime:['', RxwebValidators.time({allowSeconds:true })], 
            exitTime:['', RxwebValidators.time({message:'You can enter only time format data' })], 
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-time-dynamic-validator',
    templateUrl: './time-dynamic.component.html'
})
export class TimeDynamicValidatorComponent implements OnInit {
    attandanceDetailFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			totalIn : {
				time :  {conditionalExpression:(x,y) =>{ return  x.entryPlace == "Lunch Room" },} 
			},
						
			entryTime : {
				time :  {conditionalExpression:x => x.entryPlace == "Lunch Room",} 
			},
						
			totalOutTime : {
				time :  {allowSeconds:true,} 
			},
						
			exitTime : {
				time :  {message:'You can enter only time format data',} 
			},
			        };
		 var attandanceDetail = {
			totalIn:'', entryTime:'', totalOutTime:'', exitTime:'', 
		}
		this.attandanceDetailFormGroup = this.formBuilder.formGroup(attandanceDetail,formBuilderConfiguration);
    }
}

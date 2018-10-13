import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { AttandanceDetail } from './attandance-detail.model';

@Component({
    selector: 'app-time-dynamic',
    templateUrl: './time-dynamic.component.html'
})
export class TimeDynamicComponent implements OnInit {

    attandanceDetailFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let attandanceDetail = new AttandanceDetail();
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
		this.attandanceDetailFormGroup = this.formBuilder.formGroup(attandanceDetail,formBuilderConfiguration);
    }
}

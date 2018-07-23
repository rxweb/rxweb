import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration } from '@rxweb/reactive-form-validators';

import { AttandanceDetail } from '../attandance-detail.model';

@Component({
    selector: 'app-attandance-detail-add',
    templateUrl: './attandance-detail-add.component.html'
})
export class AttandanceDetailAddComponent implements OnInit {

    attandanceDetailFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let attandanceDetail = new AttandanceDetail();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.validations = {
			entryPlace : {
				time : true  
			},
			entryTime : {
				time :  {conditionalExpressions:'x => x.entryPlace == "Lunch Room"',} 
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

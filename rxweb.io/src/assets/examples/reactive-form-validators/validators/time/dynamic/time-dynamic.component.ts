import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-time-dynamic-validator',
    templateUrl: './time-dynamic.component.html'
})
export class TimeDynamicValidatorComponent implements OnInit {
    attandanceDetailFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			entryTime : {
				time : {conditionalExpression:'x => x.entryPlace == "Lunch Room"',} 
			},			
			totalOutTime : {
				time : {allowSeconds:true,} 
			},			
			exitTime : {
				time : {message:'You can enter only time format data',} 
			},
		};
		var attandanceDetail = { entryPlace:'', totalIn:'', entryTime:'', totalOutTime:'', exitTime:'',  }
		this.attandanceDetailFormGroup = this.formBuilder.group(attandanceDetail,formBuilderConfiguration);
    }
}

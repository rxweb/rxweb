import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
	NumericValueType
} from '@rxweb/reactive-form-validators';

import { UserInfo } from './user-info.model';

@Component({
    selector: 'app-numeric-dynamic',
    templateUrl: './numeric-dynamic.component.html'
})
export class NumericDynamicComponent implements OnInit {

    userInfoFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let userInfo = new UserInfo();
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			integerNumber : {
				numeric :  {acceptValue:NumericValueType.PositiveNumber,allowDecimal:false,conditionalExpression:(x,y) => x.dataType == "Number" ,} 
			},
						
			realNumber : {
				numeric :  {acceptValue:NumericValueType.Both,allowDecimal:false,conditionalExpression:'x => x.dataType == "Number"',} 
			},
						
			negativeNumber : {
				numeric :  {acceptValue:NumericValueType.NegativeNumber,allowDecimal:true,message:'{{0}} is not a negative number',} 
			},
			        };
		this.userInfoFormGroup = this.formBuilder.formGroup(userInfo,formBuilderConfiguration);
    }
}

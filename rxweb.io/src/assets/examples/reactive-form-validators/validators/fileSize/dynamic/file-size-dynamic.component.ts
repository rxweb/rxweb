import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-fileSize-dynamic-validator',
    templateUrl: './file-size-dynamic.component.html'
})
export class FileSizeDynamicValidatorComponent implements OnInit {
    storageCapacityFormGroup: FormGroup
					
					
					
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let formBuilderConfiguration = new FormBuilderConfiguration();
        formBuilderConfiguration.dynamicValidation = {
			
			documentStorageSize : {
				fileSize :  {maxSize:50,conditionalExpression:(x,y) => x.device == "SmartPhone" ,} 
			},
						
			photographStorageSize : {
				fileSize :  {maxSize:50,conditionalExpression:'x => x.device =="SmartPhone"',} 
			},
						
			videoStorageSize : {
				fileSize :  {maxSize:50,message:'{{0}} is not a valid size',} 
			},
			        };
		 var storageCapacity = {
			device:'', documentStorageSize:'', photographStorageSize:'', videoStorageSize:'', 
		}
		this.storageCapacityFormGroup = this.formBuilder.group(storageCapacity,formBuilderConfiguration);
    }
}

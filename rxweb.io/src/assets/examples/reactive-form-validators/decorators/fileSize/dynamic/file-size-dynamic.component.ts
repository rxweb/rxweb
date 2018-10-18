import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';
import { FormBuilderConfiguration,
} from '@rxweb/reactive-form-validators';

import { StorageCapacity } from './storage-capacity.model';

@Component({
    selector: 'app-fileSize-dynamic',
    templateUrl: './file-size-dynamic.component.html'
})
export class FileSizeDynamicComponent implements OnInit {

    storageCapacityFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let storageCapacity = new StorageCapacity();
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
		this.storageCapacityFormGroup = this.formBuilder.formGroup(storageCapacity,formBuilderConfiguration);
    }
}

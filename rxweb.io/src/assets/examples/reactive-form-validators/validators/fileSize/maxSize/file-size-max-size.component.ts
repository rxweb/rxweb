import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-fileSize-maxSize-validator',
    templateUrl: './file-size-max-size.component.html'
})
export class FileSizeMaxSizeValidatorComponent implements OnInit {
    storageCapacityFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.storageCapacityFormGroup = this.formBuilder.group({
										videoStorageSize:['', RxwebValidators.fileSize({maxSize:50  ,message:'{{0}} is not a valid size' })], 
								});
    }
}

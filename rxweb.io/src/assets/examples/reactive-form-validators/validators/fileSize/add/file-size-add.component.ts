import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-fileSize-add-validator',
    templateUrl: './file-size-add.component.html'
})
export class FileSizeAddValidatorComponent implements OnInit {
    storageCapacityFormGroup: FormGroup
					
	    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.storageCapacityFormGroup = this.formBuilder.group({
										videoStorageSize:['', RxwebValidators.fileSize({maxSize:50 })], 
								});
    }
}

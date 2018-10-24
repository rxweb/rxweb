import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { StorageCapacity } from './storage-capacity.model';

@Component({
    selector: 'app-fileSize-conditionalExpression',
    templateUrl: './file-size-conditional-expression.component.html'
})
export class FileSizeConditionalExpressionComponent implements OnInit {
    storageCapacityFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let storageCapacity = new StorageCapacity();
        this.storageCapacityFormGroup = this.formBuilder.formGroup(storageCapacity);
    }
}

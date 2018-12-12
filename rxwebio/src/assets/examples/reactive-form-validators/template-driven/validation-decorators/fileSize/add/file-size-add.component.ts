import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { StorageCapacity } from './storage-capacity.model';

@Component({
    selector: 'app-fileSize-add-template-driven-validation-decorators',
    templateUrl: './file-size-add.component.html'
})
export class FileSizeAddTemplateDrivenValidationDecoratorsComponent implements OnInit {
    storagecapacity: StorageCapacity
	
    constructor(
    ) { }

    ngOnInit() {
       this.storagecapacity= new StorageCapacity()
    }
}

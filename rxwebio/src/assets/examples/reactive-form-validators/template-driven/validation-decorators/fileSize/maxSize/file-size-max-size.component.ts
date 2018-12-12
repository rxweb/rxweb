import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { StorageCapacity } from './storage-capacity.model';

@Component({
    selector: 'app-fileSize-maxSize-template-driven-validation-decorators',
    templateUrl: './file-size-max-size.component.html'
})
export class FileSizeMaxSizeTemplateDrivenValidationDecoratorsComponent implements OnInit {
    storagecapacity: StorageCapacity
	
    constructor(
    ) { }

    ngOnInit() {
       this.storagecapacity= new StorageCapacity()
    }
}

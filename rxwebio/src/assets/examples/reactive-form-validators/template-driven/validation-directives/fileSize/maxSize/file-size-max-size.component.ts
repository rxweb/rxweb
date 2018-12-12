import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { StorageCapacity } from './storage-capacity.model';

@Component({
    selector: 'app-fileSize-maxSize-template-driven-validation-directives',
    templateUrl: './file-size-max-size.component.html'
})
export class FileSizeMaxSizeTemplateDrivenValidationDirectivesComponent implements OnInit {
    storagecapacity: StorageCapacity
	
    constructor(
    ) { }

    ngOnInit() {
       this.storagecapacity= new StorageCapacity()
    }
}

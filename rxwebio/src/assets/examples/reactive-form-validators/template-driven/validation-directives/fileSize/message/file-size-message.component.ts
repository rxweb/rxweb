import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { StorageCapacity } from './storage-capacity.model';

@Component({
    selector: 'app-fileSize-message-template-driven-validation-directives',
    templateUrl: './file-size-message.component.html'
})
export class FileSizeMessageTemplateDrivenValidationDirectivesComponent implements OnInit {
    storagecapacity: StorageCapacity
	
    constructor(
    ) { }

    ngOnInit() {
       this.storagecapacity= new StorageCapacity()
    }
}

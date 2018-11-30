import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { StorageCapacity } from './storage-capacity.model';

@Component({
    selector: 'app-fileSize-complete-template-driven',
    templateUrl: './file-size-complete.component.html'
})
export class FileSizeCompleteTemplateDrivenComponent implements OnInit {
    storagecapacity: StorageCapacity

    constructor(
    ) { }

    ngOnInit() {
       this.storagecapacity= new StorageCapacity()
    }
}

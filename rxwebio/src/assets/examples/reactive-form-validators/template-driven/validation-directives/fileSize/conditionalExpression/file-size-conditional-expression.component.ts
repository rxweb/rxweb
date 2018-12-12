import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { StorageCapacity } from './storage-capacity.model';

@Component({
    selector: 'app-fileSize-conditionalExpression-template-driven-validation-directives',
    templateUrl: './file-size-conditional-expression.component.html'
})
export class FileSizeConditionalExpressionTemplateDrivenValidationDirectivesComponent implements OnInit {
    storagecapacity: StorageCapacity
	
    constructor(
    ) { }

    ngOnInit() {
       this.storagecapacity= new StorageCapacity()
    }
}

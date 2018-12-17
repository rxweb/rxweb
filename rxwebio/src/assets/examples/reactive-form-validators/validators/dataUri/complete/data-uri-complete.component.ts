import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-dataUri-complete-validator',
    templateUrl: './data-uri-complete.component.html'
})
export class DataUriCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            scheme:['',], 
            imageDataUri:['', RxwebValidators.dataUri({conditionalExpression:(x,y) => x.scheme == "DataUri"  })], 
            audioDataUri:['', RxwebValidators.dataUri({conditionalExpression:'x => x.scheme =="DataUri"' })], 
            videoDataUri:['', RxwebValidators.dataUri({message:'{{0}} is not a proper data URI' })], 
        });
    }
}

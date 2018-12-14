import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms"
import { RxwebValidators } from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-dataUri-conditionalExpression-validator',
    templateUrl: './data-uri-conditional-expression.component.html'
})
export class DataUriConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

	constructor(
        private formBuilder: FormBuilder )
	{ }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
            scheme:['',], 
            audioDataUri:['', RxwebValidators.dataUri({conditionalExpression:'x => x.scheme =="DataUri"' })], 
            imageDataUri:['', RxwebValidators.dataUri({conditionalExpression:(x,y) => x.scheme == "DataUri"  })], 
        });
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-maxLength-complete-validator',
    templateUrl: './max-length-complete.component.html'
})
export class MaxLengthCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										firstName:['', RxwebValidators.maxLength({value:16 })], 
													middleName:['', RxwebValidators.maxLength({value:16  ,conditionalExpression:(x,y)=> x.firstName == "John" })], 
													lastName:['', RxwebValidators.maxLength({value:16  ,conditionalExpression:'x=> x.firstName == "John"' })], 
													userName:['', RxwebValidators.maxLength({value:10  ,message:'Maximum 10 characters are allowed' })], 
								});
    }
}

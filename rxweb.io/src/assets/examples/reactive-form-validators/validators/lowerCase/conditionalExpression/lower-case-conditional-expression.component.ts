import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-lowerCase-conditionalExpression-validator',
    templateUrl: './lower-case-conditional-expression.component.html'
})
export class LowerCaseConditionalExpressionValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										username:['', RxwebValidators.lowerCase()], 
													middleName:['', RxwebValidators.lowerCase({conditionalExpression:'x => x.username == "jonathan.feldman"' })], 
													firstName:['', RxwebValidators.lowerCase({conditionalExpression:(x,y) =>  x.username == "jonathan.feldman"  })], 
								});
    }
}

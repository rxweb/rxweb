import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-lowerCase-complete-validator',
    templateUrl: './lower-case-complete.component.html'
})
export class LowerCaseCompleteValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										username:['', RxwebValidators.lowerCase()], 
													firstName:['', RxwebValidators.lowerCase({conditionalExpression:(x,y) =>  x.username == "jonathan.feldman"  })], 
													middleName:['', RxwebValidators.lowerCase({conditionalExpression:'x => x.username == "jonathan.feldman"' })], 
													lastName:['', RxwebValidators.lowerCase({message:'You can enter only lowerCase letters.' })], 
								});
    }
}

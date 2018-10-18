import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-startsWith-message-validator',
    templateUrl: './starts-with-message.component.html'
})
export class StartsWithMessageValidatorComponent implements OnInit {
    userFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.userFormGroup = this.formBuilder.group({
										name:['', RxwebValidators.startsWith({value:'J'  ,message:'{{0}} does not starts with `J`' })], 
								});
    }
}

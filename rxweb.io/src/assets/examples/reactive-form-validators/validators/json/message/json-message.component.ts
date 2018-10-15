import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder,RxwebValidators 
} from '@rxweb/reactive-form-validators';

@Component({
    selector: 'app-json-message-validator',
    templateUrl: './json-message.component.html'
})
export class JsonMessageValidatorComponent implements OnInit {
    jsonInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        this.jsonInfoFormGroup = this.formBuilder.group({
										contactJson:['', RxwebValidators.json({message:'Enter only JSON type data' })], 
								});
    }
}

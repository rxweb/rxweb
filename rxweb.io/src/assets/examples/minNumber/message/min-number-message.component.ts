import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { ResultInfo } from './result-info.model';

@Component({
    selector: 'app-minnumber-message',
    templateUrl: './min-number-message.component.html'
})
export class MinNumberMessageComponent implements OnInit {

    resultInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let resultInfo = new ResultInfo();
        this.resultInfoFormGroup = this.formBuilder.formGroup(resultInfo);
    }
}

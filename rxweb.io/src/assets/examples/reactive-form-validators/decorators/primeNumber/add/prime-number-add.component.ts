import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { NumberInfo } from './number-info.model';

@Component({
    selector: 'app-primeNumber-add',
    templateUrl: './prime-number-add.component.html'
})
export class PrimeNumberAddComponent implements OnInit {

    numberInfoFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let numberInfo = new NumberInfo();
        this.numberInfoFormGroup = this.formBuilder.formGroup(numberInfo);
    }
}

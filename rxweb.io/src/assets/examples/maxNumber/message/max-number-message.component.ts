import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { SubjectDetails } from './subject-details.model';

@Component({
    selector: 'app-maxnumber-message',
    templateUrl: './max-number-message.component.html'
})
export class MaxNumberMessageComponent implements OnInit {

    subjectDetailsFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder
    ) { }

    ngOnInit() {
        let subjectDetails = new SubjectDetails();
        this.subjectDetailsFormGroup = this.formBuilder.formGroup(subjectDetails);
    }
}

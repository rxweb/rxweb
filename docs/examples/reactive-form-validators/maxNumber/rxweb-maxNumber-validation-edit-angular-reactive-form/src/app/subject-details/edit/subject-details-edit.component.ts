import { Component, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms"
import { HttpClient } from '@angular/common/http';

import { RxFormBuilder } from '@rxweb/reactive-form-validators';

import { SubjectDetails } from '../subject-details.model';

@Component({
    selector: 'app-subject-details-edit',
    templateUrl: './subject-details-edit.component.html'
})
export class SubjectDetailsEditComponent implements OnInit {

    subjectDetailsFormGroup: FormGroup

    constructor(
        private formBuilder: RxFormBuilder,		private http: HttpClient

    ) { }

    ngOnInit() {
        this.http.get('assets/subject-details-data.json').subscribe(subjectDetails => {
            this.subjectDetailsFormGroup = this.formBuilder.formGroup<SubjectDetails>(SubjectDetails,subjectDetails);
        })
    }
}

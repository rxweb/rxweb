import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { AttandanceDetail } from './attandance-detail.model';

@Component({
    selector: 'app-time-allowSeconds-template-driven-validation-directives',
    templateUrl: './time-allow-seconds.component.html'
})
export class TimeAllowSecondsTemplateDrivenValidationDirectivesComponent implements OnInit {
    attandancedetail: AttandanceDetail
	
    constructor(
    ) { }

    ngOnInit() {
       this.attandancedetail= new AttandanceDetail()
    }
}

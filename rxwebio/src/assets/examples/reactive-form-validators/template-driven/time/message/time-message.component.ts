import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { AttandanceDetail } from './attandance-detail.model';

@Component({
    selector: 'app-time-message-template-driven',
    templateUrl: './time-message.component.html'
})
export class TimeMessageTemplateDrivenComponent implements OnInit {
    attandancedetail: AttandanceDetail

    constructor(
    ) { }

    ngOnInit() {
       this.attandancedetail= new AttandanceDetail()
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { ResultInfo } from './result-info.model';

@Component({
    selector: 'app-minNumber-complete-template-driven',
    templateUrl: './min-number-complete.component.html'
})
export class MinNumberCompleteTemplateDrivenComponent implements OnInit {
    resultinfo: ResultInfo

    constructor(
    ) { }

    ngOnInit() {
       this.resultinfo= new ResultInfo()
    }
}

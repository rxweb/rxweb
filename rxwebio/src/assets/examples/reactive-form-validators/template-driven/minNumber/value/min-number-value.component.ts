import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { ResultInfo } from './result-info.model';

@Component({
    selector: 'app-minNumber-value-template-driven',
    templateUrl: './min-number-value.component.html'
})
export class MinNumberValueTemplateDrivenComponent implements OnInit {
    resultinfo: ResultInfo

    constructor(
    ) { }

    ngOnInit() {
       this.resultinfo= new ResultInfo()
    }
}

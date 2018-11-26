import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { ResultInfo } from './result-info.model';

@Component({
    selector: 'app-minNumber-add-template-driven',
    templateUrl: './min-number-add.component.html'
})
export class MinNumberAddTemplateDrivenComponent implements OnInit {
    resultinfo: ResultInfo

    constructor(
    ) { }

    ngOnInit() {
       this.resultinfo= new ResultInfo()
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { ResultInfo } from './result-info.model';

@Component({
    selector: 'app-minNumber-message-template-driven',
    templateUrl: './min-number-message.component.html'
})
export class MinNumberMessageTemplateDrivenComponent implements OnInit {
    resultinfo: ResultInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.resultinfo= new ResultInfo()
    }
}

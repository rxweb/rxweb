import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { ResultInfo } from './result-info.model';

@Component({
    selector: 'app-minNumber-complete-template-driven-validation-decorators',
    templateUrl: './min-number-complete.component.html'
})
export class MinNumberCompleteTemplateDrivenValidationDecoratorsComponent implements OnInit {
    resultinfo: ResultInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.resultinfo= new ResultInfo()
    }
}

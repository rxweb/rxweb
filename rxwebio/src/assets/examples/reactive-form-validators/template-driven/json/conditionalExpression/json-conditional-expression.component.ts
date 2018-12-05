import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { JsonInfo } from './json-info.model';

@Component({
    selector: 'app-json-conditionalExpression-template-driven',
    templateUrl: './json-conditional-expression.component.html'
})
export class JsonConditionalExpressionTemplateDrivenComponent implements OnInit {
    jsoninfo: JsonInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.jsoninfo= new JsonInfo()
    }
}

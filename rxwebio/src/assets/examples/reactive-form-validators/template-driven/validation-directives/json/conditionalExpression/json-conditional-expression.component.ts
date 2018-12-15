import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { JsonInfo } from './json-info.model';

@Component({
    selector: 'app-json-conditionalExpression-template-driven-validation-directives',
    templateUrl: './json-conditional-expression.component.html'
})
export class JsonConditionalExpressionTemplateDrivenValidationDirectivesComponent implements OnInit {
    jsoninfo: JsonInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.jsoninfo= new JsonInfo()
    }
}

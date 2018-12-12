import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { JsonInfo } from './json-info.model';

@Component({
    selector: 'app-json-message-template-driven-validation-directives',
    templateUrl: './json-message.component.html'
})
export class JsonMessageTemplateDrivenValidationDirectivesComponent implements OnInit {
    jsoninfo: JsonInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.jsoninfo= new JsonInfo()
    }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { JsonInfo } from './json-info.model';

@Component({
    selector: 'app-json-add-template-driven-validation-directives',
    templateUrl: './json-add.component.html'
})
export class JsonAddTemplateDrivenValidationDirectivesComponent implements OnInit {
    jsoninfo: JsonInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.jsoninfo= new JsonInfo()
    }
}

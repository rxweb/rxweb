import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { JsonInfo } from './json-info.model';

@Component({
    selector: 'app-json-complete-template-driven',
    templateUrl: './json-complete.component.html'
})
export class JsonCompleteTemplateDrivenComponent implements OnInit {
    jsoninfo: JsonInfo

    constructor(
    ) { }

    ngOnInit() {
       this.jsoninfo= new JsonInfo()
    }
}

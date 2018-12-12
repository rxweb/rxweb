import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { NumberInfo } from './number-info.model';

@Component({
    selector: 'app-latitude-add-template-driven-validation-directives',
    templateUrl: './latitude-add.component.html'
})
export class LatitudeAddTemplateDrivenValidationDirectivesComponent implements OnInit {
    numberinfo: NumberInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.numberinfo= new NumberInfo()
    }
}

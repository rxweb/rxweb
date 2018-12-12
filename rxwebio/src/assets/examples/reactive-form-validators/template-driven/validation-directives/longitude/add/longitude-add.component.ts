import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { NumberInfo } from './number-info.model';

@Component({
    selector: 'app-longitude-add-template-driven-validation-directives',
    templateUrl: './longitude-add.component.html'
})
export class LongitudeAddTemplateDrivenValidationDirectivesComponent implements OnInit {
    numberinfo: NumberInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.numberinfo= new NumberInfo()
    }
}

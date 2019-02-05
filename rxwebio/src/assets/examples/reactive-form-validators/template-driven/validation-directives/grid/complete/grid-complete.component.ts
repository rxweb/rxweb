import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { DigitalInfo } from './digital-info.model';

@Component({
    selector: 'app-grid-complete-template-driven-validation-directives',
    templateUrl: './grid-complete.component.html'
})
export class GridCompleteTemplateDrivenValidationDirectivesComponent implements OnInit {
    digitalinfo: DigitalInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.digitalinfo= new DigitalInfo()
    }
}

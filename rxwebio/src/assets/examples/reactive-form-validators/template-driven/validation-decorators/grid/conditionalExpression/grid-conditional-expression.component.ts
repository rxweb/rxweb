import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { DigitalInfo } from './digital-info.model';

@Component({
    selector: 'app-grid-conditionalExpression-template-driven-validation-decorators',
    templateUrl: './grid-conditional-expression.component.html'
})
export class GridConditionalExpressionTemplateDrivenValidationDecoratorsComponent implements OnInit {
    digitalinfo: DigitalInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.digitalinfo= new DigitalInfo()
    }
}

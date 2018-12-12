import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { HexcolorInfo } from './hexcolor-info.model';

@Component({
    selector: 'app-hexColor-complete-template-driven-validation-decorators',
    templateUrl: './hex-color-complete.component.html'
})
export class HexColorCompleteTemplateDrivenValidationDecoratorsComponent implements OnInit {
    hexcolorinfo: HexcolorInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.hexcolorinfo= new HexcolorInfo()
    }
}

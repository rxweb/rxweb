import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { HexcolorInfo } from './hexcolor-info.model';

@Component({
    selector: 'app-hexColor-message-template-driven-validation-decorators',
    templateUrl: './hex-color-message.component.html'
})
export class HexColorMessageTemplateDrivenValidationDecoratorsComponent implements OnInit {
    hexcolorinfo: HexcolorInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.hexcolorinfo= new HexcolorInfo()
    }
}

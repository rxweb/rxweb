import { Component, OnInit } from '@angular/core';
import { FormGroup,Validators } from "@angular/forms"
import { HexcolorInfo } from './hexcolor-info.model';

@Component({
    selector: 'app-hexColor-message-template-driven',
    templateUrl: './hex-color-message.component.html'
})
export class HexColorMessageTemplateDrivenComponent implements OnInit {
    hexcolorinfo: HexcolorInfo
	
    constructor(
    ) { }

    ngOnInit() {
       this.hexcolorinfo= new HexcolorInfo()
    }
}

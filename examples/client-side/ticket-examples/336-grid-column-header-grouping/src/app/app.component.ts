
import { translate, RxTranslation } from '@rxweb/translate';

import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, EmbeddedViewRef } from '@angular/core';
import { grid, gridColumn, GridDesigner, actionColumn, GridCustomTemplate } from "@rxweb/grid"
import { FormControl } from '@angular/forms';

import { ElementConfig } from '@rxweb/grid';

import { GRID_CUSTOM_TEMPLATES} from './grid-custom-template'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    @translate() global: any;

    name: string = "Bill"

    constructor(private translation: RxTranslation) {

    }

    changeLanguage(language: string) {
        this.translation.change(language)
    }

    ngOnInit() {
        GridCustomTemplate.register(GRID_CUSTOM_TEMPLATES);
    }
}



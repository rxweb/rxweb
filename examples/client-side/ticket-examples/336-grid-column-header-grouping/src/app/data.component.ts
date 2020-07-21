import { Component, OnInit, ComponentFactoryResolver, ViewContainerRef, EmbeddedViewRef } from '@angular/core';
import { gridColumn, grid, GridDesigner, actionColumn, GridCustomTemplate } from "@rxweb/grid"
import { FormControl } from '@angular/forms';
import { TemplateConfig } from '@rxweb/grid';
import { ElementConfig } from '@rxweb/grid';
import { RxTranslation, translate } from '@rxweb/translate';

import { AppGrid } from './app-grid'
import { vArticleLookUpBase } from './v-article-lookup-base'




@Component({
    selector: 'app-data',
    template: `
<div class="table-responsive">
  <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper pb-0 dt-bootstrap4">
    <div class="table-responsive">
      <div class="dataTables_wrapper pb-0 dt-bootstrap4">
        <div id="grid"></div>
      </div>
    </div>
  </div>
</div>

`
})
export class DataComponent implements OnInit {
    @translate({ translationName:"data" }) data: any;

    name: string = "Bill"
    showElement: boolean;

    constructor(private translation: RxTranslation) {
        this.staticData();
    }

    changeLanguage(language: string) {
        this.translation.change(language)
    }

    gridConfig: AppGrid;
    journalArticleTypesList = [];


    ngOnInit() {
        this.bindGrid();
    }


    bindGrid() {
        this.gridConfig = new AppGrid(
            this.journalArticleTypesList, vArticleLookUpBase, );
        this.gridConfig.design(document.getElementById("grid"));
    }
    staticData() {
        this.journalArticleTypesList = [
            { "id": 1, "journalId": 9, "name": "Case Studies", "displayOrder": 1 },
            { "id": 2, "journalId": 9, "name": "Research Paper", "displayOrder": 2 },
            { "id": 3, "journalId": 9, "name": "Short Communication", "displayOrder": 3 },
            { "id": 4, "journalId": 9, "name": "demo", "displayOrder": 4 },
            { "id": 5, "journalId": 9, "name": "demo2", "displayOrder": 5 },
            { "id": 6, "journalId": 9, "name": "Editorial", "displayOrder": 6 },
            { "id": 7, "journalId": 9, "name": "Review Article", "displayOrder": 7 },
            { "id": 8, "journalId": 9, "name": "Book Review", "displayOrder": 8 },
            { "id": 9, "journalId": 9, "name": "Technical Note", "displayOrder": 9 },
            { "id": 10, "journalId": 9, "name": "demo3", "displayOrder": 10 },
            { "id": 11, "journalId": 9, "name": "demo4", "displayOrder": 11 },
            { "id": 12, "journalId": 9, "name": "demo5", "displayOrder": 12 }]

    }
   
}


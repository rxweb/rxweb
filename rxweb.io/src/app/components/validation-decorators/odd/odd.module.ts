import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { ODD_ROUTING } from './odd.routing';
import { OddComponent } from './odd.component';
import { OddExtendedModule } from '../../../../assets/examples/odd/odd.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";
import { RightSideBarSharedModule } from "src/app/components/shared/right-sidebar/right-sidebar-shared.module";
import { TitleCasePipe } from "@angular/common";

@NgModule({
  imports: [
    ODD_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, OddExtendedModule, ClipboardModule,DisqusSharedModule,RightSideBarSharedModule],
  declarations: [OddComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[TitleCasePipe]
})
export class OddModule { }


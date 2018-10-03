import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { HEX_COLOR_ROUTING } from './hexColor.routing';
import { HexColorComponent } from './hexColor.component';
import { HexColorExtendedModule } from '../../../../assets/examples/hexColor/hexColor.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";
import { RightSideBarSharedModule } from "src/app/components/shared/right-sidebar/right-sidebar-shared.module";

@NgModule({
  imports: [
    HEX_COLOR_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, HexColorExtendedModule, ClipboardModule,DisqusSharedModule,RightSideBarSharedModule],
  declarations: [HexColorComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class HexColorModule { }


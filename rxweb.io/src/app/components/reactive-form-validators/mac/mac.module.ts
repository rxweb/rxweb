import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { MAC_ROUTING } from './mac.routing';
import { MacComponent } from './mac.component';
import { MacExtendedModule } from '../../../../assets/examples/mac/mac.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";
import { RightSideBarSharedModule } from "src/app/components/shared/right-sidebar/right-sidebar-shared.module";

@NgModule({
  imports: [
    MAC_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, MacExtendedModule, ClipboardModule,DisqusSharedModule,RightSideBarSharedModule],
  declarations: [MacComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class MacModule { }


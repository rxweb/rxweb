import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { MIN_NUMBER_ROUTING } from './minNumber.routing';
import { MinNumberComponent } from './minNumber.component';
import { MinNumberExtendedModule } from '../../../../assets/examples/minNumber/minNumber.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";
import { RightSideBarSharedModule } from "src/app/components/shared/right-sidebar/right-sidebar-shared.module";

@NgModule({
  imports: [
    MIN_NUMBER_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, MinNumberExtendedModule, ClipboardModule,DisqusSharedModule,RightSideBarSharedModule],
  declarations: [MinNumberComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class MinNumberModule { }


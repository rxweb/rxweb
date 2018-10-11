import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { MAX_NUMBER_ROUTING } from './maxNumber.routing';
import { MaxNumberComponent } from './maxNumber.component';
import { MaxNumberExtendedModule } from '../../../../assets/examples/reactive-form-validators/decorators/maxNumber/maxNumber.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";
import { RightSideBarSharedModule } from "src/app/components/shared/right-sidebar/right-sidebar-shared.module";
import { TitleCasePipe } from "@angular/common";

@NgModule({
  imports: [
    MAX_NUMBER_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, MaxNumberExtendedModule, ClipboardModule,DisqusSharedModule,RightSideBarSharedModule],
  declarations: [MaxNumberComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[TitleCasePipe]
})
export class MaxNumberModule { }


import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { COMPARE_ROUTING } from './compare.routing';
import { CompareComponent } from './compare.component';
import { CompareExtendedModule } from 'src/assets/examples/reactive-form-validators/validators/compare/compare.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";
import { RightSideBarSharedModule } from "src/app/components/shared/right-sidebar/right-sidebar-shared.module";
import { TitleCasePipe } from "@angular/common";

@NgModule({
  imports: [
    COMPARE_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, CompareExtendedModule, ClipboardModule,DisqusSharedModule,RightSideBarSharedModule],
  declarations: [CompareComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[TitleCasePipe]
})
export class CompareValidatorsModule { }


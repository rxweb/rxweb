import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { UPPER_CASE_ROUTING } from './upperCase.routing';
import { UpperCaseComponent } from './upperCase.component';
import { UpperCaseExtendedModule } from 'src/assets/examples/reactive-form-validators/decorators/upperCase/upperCase.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";
import { RightSideBarSharedModule } from "src/app/components/shared/right-sidebar/right-sidebar-shared.module";
import { MergeDashPipe } from "src/app/pipes/merge-dash.pipe";

@NgModule({
  imports: [
    UPPER_CASE_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, UpperCaseExtendedModule, ClipboardModule,DisqusSharedModule,RightSideBarSharedModule],
  declarations: [UpperCaseComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[MergeDashPipe]
})
export class UpperCaseDecoratorsModule { }


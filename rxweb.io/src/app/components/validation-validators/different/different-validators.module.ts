import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { DIFFERENT_ROUTING } from './different.routing';
import { DifferentComponent } from './different.component';
import { DifferentExtendedModule } from 'src/assets/examples/reactive-form-validators/validators/different/different.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";
import { RightSideBarSharedModule } from "src/app/components/shared/right-sidebar/right-sidebar-shared.module";
import { MergeDashPipe } from "src/app/pipes/merge-dash.pipe";

@NgModule({
  imports: [
    DIFFERENT_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, DifferentExtendedModule, ClipboardModule,DisqusSharedModule,RightSideBarSharedModule],
  declarations: [DifferentComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[MergeDashPipe]
})
export class DifferentValidatorsModule { }


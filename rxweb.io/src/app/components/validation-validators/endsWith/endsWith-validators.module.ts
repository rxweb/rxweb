import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { ENDS_WITH_ROUTING } from './endsWith.routing';
import { EndsWithComponent } from './endsWith.component';
import { EndsWithExtendedModule } from 'src/assets/examples/reactive-form-validators/validators/endsWith/endsWith.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";
import { RightSideBarSharedModule } from "src/app/components/shared/right-sidebar/right-sidebar-shared.module";
import { MergeDashPipe } from "src/app/pipes/merge-dash.pipe";

@NgModule({
  imports: [
    ENDS_WITH_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, EndsWithExtendedModule, ClipboardModule,DisqusSharedModule,RightSideBarSharedModule],
  declarations: [EndsWithComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[MergeDashPipe]
})
export class EndsWithValidatorsModule { }


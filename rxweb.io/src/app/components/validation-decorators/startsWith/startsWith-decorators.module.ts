import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { STARTS_WITH_ROUTING } from './startsWith.routing';
import { StartsWithComponent } from './startsWith.component';
import { StartsWithExtendedModule } from 'src/assets/examples/reactive-form-validators/decorators/startsWith/startsWith.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";
import { RightSideBarSharedModule } from "src/app/components/shared/right-sidebar/right-sidebar-shared.module";
import { MergeDashPipe } from "src/app/pipes/merge-dash.pipe";

@NgModule({
  imports: [
    STARTS_WITH_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, StartsWithExtendedModule, ClipboardModule,DisqusSharedModule,RightSideBarSharedModule],
  declarations: [StartsWithComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[MergeDashPipe]
})
export class StartsWithDecoratorsModule { }


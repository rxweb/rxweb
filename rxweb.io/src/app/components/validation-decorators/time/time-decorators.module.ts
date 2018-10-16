import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { TIME_ROUTING } from './time.routing';
import { TimeComponent } from './time.component';
import { TimeExtendedModule } from 'src/assets/examples/reactive-form-validators/decorators/time/time.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";
import { RightSideBarSharedModule } from "src/app/components/shared/right-sidebar/right-sidebar-shared.module";
import { MergeDashPipe } from "src/app/pipes/merge-dash.pipe";

@NgModule({
  imports: [
    TIME_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, TimeExtendedModule, ClipboardModule,DisqusSharedModule,RightSideBarSharedModule],
  declarations: [TimeComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[MergeDashPipe]
})
export class TimeDecoratorsModule { }


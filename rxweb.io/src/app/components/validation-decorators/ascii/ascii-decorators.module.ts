import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { ASCII_ROUTING } from './ascii.routing';
import { AsciiComponent } from './ascii.component';
import { AsciiExtendedModule } from 'src/assets/examples/reactive-form-validators/decorators/ascii/ascii.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";
import { RightSideBarSharedModule } from "src/app/components/shared/right-sidebar/right-sidebar-shared.module";
import { MergeDashPipe } from "src/app/pipes/merge-dash.pipe";

@NgModule({
  imports: [
    ASCII_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, AsciiExtendedModule, ClipboardModule,DisqusSharedModule,RightSideBarSharedModule],
  declarations: [AsciiComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers:[MergeDashPipe]
})
export class AsciiDecoratorsModule { }


import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { TIME_ROUTING } from './time.routing';
import { TimeComponent } from './time.component';
import { TimeExtendedModule } from '../../../../assets/examples/time/time.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";

@NgModule({
  imports: [
    TIME_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, TimeExtendedModule, ClipboardModule,DisqusSharedModule],
  declarations: [TimeComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class TimeModule { }


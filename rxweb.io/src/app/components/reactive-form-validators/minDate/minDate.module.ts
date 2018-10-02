import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { MIN_DATE_ROUTING } from './minDate.routing';
import { MinDateComponent } from './minDate.component';
import { MinDateExtendedModule } from '../../../../assets/examples/minDate/minDate.module';
import { DisqusComponent } from '../../shared/disqus/disqus.component';

@NgModule({
  imports: [
    MIN_DATE_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, MinDateExtendedModule, ClipboardModule],
  declarations: [MinDateComponent,DisqusComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class MinDateModule { }


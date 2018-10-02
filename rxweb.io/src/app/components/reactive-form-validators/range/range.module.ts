import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { RANGE_ROUTING } from './range.routing';
import { RangeComponent } from './range.component';
import { RangeExtendedModule } from '../../../../assets/examples/range/range.module';
import { DisqusComponent } from '../../shared/disqus/disqus.component';

@NgModule({
  imports: [
    RANGE_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, RangeExtendedModule, ClipboardModule],
  declarations: [RangeComponent,DisqusComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class RangeModule { }


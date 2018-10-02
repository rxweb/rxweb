import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { MAX_DATE_ROUTING } from './maxDate.routing';
import { MaxDateComponent } from './maxDate.component';
import { MaxDateExtendedModule } from '../../../../assets/examples/maxDate/maxDate.module';
import { DisqusComponent } from '../../shared/disqus/disqus.component';

@NgModule({
  imports: [
    MAX_DATE_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, MaxDateExtendedModule, ClipboardModule],
  declarations: [MaxDateComponent,DisqusComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class MaxDateModule { }


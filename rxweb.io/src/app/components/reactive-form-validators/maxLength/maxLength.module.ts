import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { MAX_LENGTH_ROUTING } from './maxLength.routing';
import { MaxLengthComponent } from './maxLength.component';
import { MaxLengthExtendedModule } from '../../../../assets/examples/maxLength/maxLength.module';
import { DisqusComponent } from '../../shared/disqus/disqus.component';

@NgModule({
  imports: [
    MAX_LENGTH_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, MaxLengthExtendedModule, ClipboardModule],
  declarations: [MaxLengthComponent,DisqusComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class MaxLengthModule { }


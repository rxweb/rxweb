import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { MIN_LENGTH_ROUTING } from './minLength.routing';
import { MinLengthComponent } from './minLength.component';
import { MinLengthExtendedModule } from '../../../../assets/examples/minLength/minLength.module';
import { DisqusComponent } from '../../shared/disqus/disqus.component';

@NgModule({
  imports: [
    MIN_LENGTH_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, MinLengthExtendedModule, ClipboardModule],
  declarations: [MinLengthComponent,DisqusComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class MinLengthModule { }


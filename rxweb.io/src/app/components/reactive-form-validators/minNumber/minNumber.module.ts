import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { MIN_NUMBER_ROUTING } from './minNumber.routing';
import { MinNumberComponent } from './minNumber.component';
import { MinNumberExtendedModule } from '../../../../assets/examples/minNumber/minNumber.module';
import { DisqusComponent } from '../../shared/disqus/disqus.component';

@NgModule({
  imports: [
    MIN_NUMBER_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, MinNumberExtendedModule, ClipboardModule],
  declarations: [MinNumberComponent,DisqusComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class MinNumberModule { }


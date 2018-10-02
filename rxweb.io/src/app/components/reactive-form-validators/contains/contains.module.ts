import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { CONTAINS_ROUTING } from './contains.routing';
import { ContainsComponent } from './contains.component';
import { ContainsExtendedModule } from '../../../../assets/examples/contains/contains.module';
import { DisqusComponent } from '../../shared/disqus/disqus.component';

@NgModule({
  imports: [
    CONTAINS_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, ContainsExtendedModule, ClipboardModule],
  declarations: [ContainsComponent,DisqusComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class ContainsModule { }


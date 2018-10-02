import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { COMPARE_ROUTING } from './compare.routing';
import { CompareComponent } from './compare.component';
import { CompareExtendedModule } from '../../../../assets/examples/compare/compare.module';
import { DisqusComponent } from '../../shared/disqus/disqus.component';

@NgModule({
  imports: [
    COMPARE_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, CompareExtendedModule, ClipboardModule],
  declarations: [CompareComponent,DisqusComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class CompareModule { }


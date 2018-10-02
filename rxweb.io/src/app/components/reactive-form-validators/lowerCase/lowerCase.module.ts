import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { LOWER_CASE_ROUTING } from './lowerCase.routing';
import { LowerCaseComponent } from './lowerCase.component';
import { LowerCaseExtendedModule } from '../../../../assets/examples/lowerCase/lowerCase.module';
import { DisqusComponent } from '../../shared/disqus/disqus.component';

@NgModule({
  imports: [
    LOWER_CASE_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, LowerCaseExtendedModule, ClipboardModule],
  declarations: [LowerCaseComponent,DisqusComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class LowerCaseModule { }


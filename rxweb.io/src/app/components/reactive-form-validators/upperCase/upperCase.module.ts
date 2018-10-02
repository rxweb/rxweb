import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { UPPER_CASE_ROUTING } from './upperCase.routing';
import { UpperCaseComponent } from './upperCase.component';
import { UpperCaseExtendedModule } from '../../../../assets/examples/upperCase/upperCase.module';
import { DisqusComponent } from '../../shared/disqus/disqus.component';

@NgModule({
  imports: [
    UPPER_CASE_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, UpperCaseExtendedModule, ClipboardModule],
  declarations: [UpperCaseComponent,DisqusComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class UpperCaseModule { }


import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { PATTERN_ROUTING } from './pattern.routing';
import { PatternComponent } from './pattern.component';
import { PatternExtendedModule } from '../../../../assets/examples/pattern/pattern.module';
import { DisqusSharedModule } from "src/app/components/shared/disqus/disqus-shared.module";

@NgModule({
  imports: [
    PATTERN_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, PatternExtendedModule, ClipboardModule,DisqusSharedModule],
  declarations: [PatternComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class PatternModule { }


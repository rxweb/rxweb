import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { PATTERN_ROUTING } from './pattern.routing';
import { PatternComponent } from './pattern.component';
import { PatternExtendedModule } from '../../../../assets/examples/pattern/pattern.module';
import { DisqusComponent } from '../../shared/disqus/disqus.component';

@NgModule({
  imports: [
    PATTERN_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, PatternExtendedModule, ClipboardModule],
  declarations: [PatternComponent,DisqusComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class PatternModule { }


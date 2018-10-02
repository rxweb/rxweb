import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { DIGIT_ROUTING } from './digit.routing';
import { DigitComponent } from './digit.component';
import { DigitExtendedModule } from '../../../../assets/examples/digit/digit.module';
import { DisqusComponent } from '../../shared/disqus/disqus.component';

@NgModule({
  imports: [
    DIGIT_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, DigitExtendedModule, ClipboardModule],
  declarations: [DigitComponent,DisqusComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class DigitModule { }


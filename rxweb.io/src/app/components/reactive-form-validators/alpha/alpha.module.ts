import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HighlightModule } from 'ngx-highlightjs';
import { ClipboardModule } from 'ngx-clipboard';
import { ALPHA_ROUTING } from './alpha.routing';
import { AlphaComponent } from './alpha.component';
import { AlphaExtendedModule } from '../../../../assets/examples/alpha/alpha.module';

@NgModule({
  imports: [
    ALPHA_ROUTING,
    CommonModule, FormsModule, ReactiveFormsModule, HighlightModule, AlphaExtendedModule, ClipboardModule],
  declarations: [AlphaComponent],
  exports: [RouterModule],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AlphaModule { }

